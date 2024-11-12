import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import React, { useRef } from 'react';
import { CardContainer } from '../components/containers/cardStyle.ts';
import { CardName, ColumnContainer } from '../components/filters/style.ts';
import { TextField } from '../components/input';
import { WireGuardContainer, WireGuardsButtonContainer, WireGuardsFormsContainer } from '../components/containers/style.ts';
import { ErrorText } from '../components/text/wireGuard.ts';
import { Button } from '../components/button/style.ts';
import { useTheme } from 'styled-components';

interface FormInputs {
  privateKey: string;
  address: string;
  listenPort: number;
  publicKey: string;
  endpoint: string;
  allowedIPs: string;
  persistentKeepalive: number;
}

const generateConfigFile = (data: FormInputs) => {
  return `[Interface]
PrivateKey = ${data.privateKey}
Address = ${data.address}
ListenPort = ${data.listenPort}

[Peer]
PublicKey = ${data.publicKey}
Endpoint = ${data.endpoint}
AllowedIPs = ${data.allowedIPs}
PersistentKeepalive = ${data.persistentKeepalive}`;
};

const downloadConfigFile = (data: FormInputs) => {
  const fileContent = generateConfigFile(data);
  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'config.conf';
  link.click();
};

const ipRegex =
  // eslint-disable-next-line max-len
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipPortRegex =
  // eslint-disable-next-line max-len
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):(\d{1,5}))$/;
const ipCidrRegex =
  // eslint-disable-next-line max-len
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))$/;

const schema = yup
  .object({
    privateKey: yup.string().required('PrivateKey is required'),
    address: yup.string().matches(ipRegex, 'Address must be a valid IP').required('Address is required'),
    listenPort: yup
      .number()
      .typeError('ListenPort must be a number')
      .min(1, 'ListenPort must be greater than 0')
      .max(65535, 'ListenPort must be less than 65536')
      .required('ListenPort is required'),
    publicKey: yup.string().required('PublicKey is required'),
    endpoint: yup.string().matches(ipPortRegex, 'Endpoint must be a valid IP:port').required('Endpoint is required'),
    allowedIPs: yup.string().matches(ipCidrRegex, 'AllowedIPs must be a valid IP/CIDR').required('AllowedIPs is required'),
    persistentKeepalive: yup
      .number()
      .typeError('PersistentKeepalive must be a number')
      .min(0, 'PersistentKeepalive must be at least 0')
      .max(65535, 'PersistentKeepalive must be less than 65536')
      .required('PersistentKeepalive is required'),
  })
  .required();

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('here');
  const file = event.target.files?.[0];

  if (file && file.name.endsWith('.conf')) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      parseConfigFile(content);
    };

    reader.onerror = () => console.log('Ошибка при чтении файла');
    reader.readAsText(file, 'UTF-8');
  } else {
    console.log('Загружен файл не в формате conf');
  }
};

const parseConfigFile = (content: string) => {
  const configData: Partial<FormInputs> = {};

  const lines = content.split('\n');
  lines.forEach((line) => {
    const [key, value] = line.split('=').map((part) => part.trim());
    if (key && value) {
      switch (key) {
        case 'PrivateKey':
          configData.privateKey = value;
          break;
        case 'Address':
          configData.address = value;
          break;
        case 'ListenPort':
          configData.listenPort = parseInt(value, 10);
          break;
        case 'PublicKey':
          configData.publicKey = value;
          break;
        case 'Endpoint':
          configData.endpoint = value;
          break;
        case 'AllowedIPs':
          configData.allowedIPs = value;
          break;
        case 'PersistentKeepalive':
          configData.persistentKeepalive = parseInt(value, 10);
          break;
      }
    }
  });

  console.log('Parsed Config Data:', configData);
};

const FileUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <input ref={fileInputRef} type="file" accept=".conf" onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload" />
      <label htmlFor="file-upload">
        <Button type="button" onClick={handleClick}>
          Загрузить конфигурацию
        </Button>
      </label>
    </div>
  );
};

export const WireGuard: React.FC = () => {
  const { t } = useTranslation();
  const {colors} = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    downloadConfigFile(data);
  };

  return (
    <WireGuardContainer onSubmit={handleSubmit(onSubmit)}>


      <div style={{
        position: 'absolute',
        top: '1.6rem',
        right: '1.6rem',
        border: `1px solid rgb(${colors.primary})`,
        color: `rgb(${colors.primary})`, padding: '0.8rem',
        fontSize: '1.4rem',
        borderRadius: '8px'
      }}>
        UA
      </div>

      <WireGuardsFormsContainer>
        <CardContainer>
          <CardName>{t('Interface')}</CardName>
          <ColumnContainer>
            <TextField
              label={t('PrivateKey')}
              id="privateKey"
              type="text"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.privateKey?.message}>{errors.privateKey?.message}</ErrorText>
            <TextField
              label={t('Address')}
              id="address"
              type="text"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.address?.message}>{errors.address?.message}</ErrorText>
            <TextField
              label={t('ListenPort')}
              id="listenPort"
              type="number"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.listenPort?.message}>{errors.listenPort?.message}</ErrorText>
          </ColumnContainer>
        </CardContainer>

        <CardContainer>
          <CardName>{t('Peer')}</CardName>
          <ColumnContainer>
            <TextField
              label={t('PublicKey')}
              id="publicKey"
              type="text"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.privateKey?.message}>{errors.publicKey?.message}</ErrorText>
            <TextField
              label={t('Endpoint')}
              id="endpoint"
              type="text"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.endpoint?.message}>{errors.endpoint?.message}</ErrorText>
            <TextField
              label={t('AllowedIPs')}
              id="allowedIPs"
              type="text"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText isVisible={!!errors.allowedIPs?.message}>{errors.allowedIPs?.message}</ErrorText>
            <TextField
              label={t('PersistentKeepalive')}
              id="persistentKeepalive"
              type="number"
              labelStyle={{ background: '#121212', color: 'white' }}
              inputStyle={{ background: '#121212', color: 'white' }}
            />
            <ErrorText
              isVisible={!!errors.persistentKeepalive?.message}>{errors.persistentKeepalive?.message}</ErrorText>
          </ColumnContainer>
        </CardContainer>
      </WireGuardsFormsContainer>

      <WireGuardsButtonContainer>
        <FileUploadButton />
        <Button type="submit">{t('Submit')}</Button>
      </WireGuardsButtonContainer>
    </WireGuardContainer>
  );
};
