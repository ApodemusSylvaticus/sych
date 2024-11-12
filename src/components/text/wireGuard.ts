import styled from 'styled-components';

interface IsVisible {
  isVisible: boolean;
}
export const ErrorText = styled.span<IsVisible>`
  height: ${(props) => (props.isVisible ? '2rem' : '0')};
  line-height: 2rem;
  font-size: 1.2rem;
  color: rgb(${(props) => props.theme.colors.error});
  transition: height 0.3s linear;
`;
