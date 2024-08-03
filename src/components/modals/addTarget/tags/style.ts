import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 12px 4px;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

export const CardName = styled.span`
  position: absolute;
  top: 0;
  left: 8px;
  background: ${(props) => props.theme.colors.primary};
  z-index: 2;
  transform: translateY(-55%);
  font-weight: 500;
  font-size: 18px;
  padding: 0 4px;
`;

export const ChosenTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &:last-child(div) {
    margin-right: auto;
  }
`;

export const TagsListContainer = styled(ChosenTagContainer)``;

export const LastElemWrapper = styled.div`
  flex-grow: 99999;
  display: flex;

  & div {
    flex-grow: 0;
    margin-right: auto;
  }
`;
