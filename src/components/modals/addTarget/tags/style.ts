import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 1.8rem 0.4rem 1.2rem;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
`;

export const CardName = styled.span`
  position: absolute;
  top: 0;
  left: 0.8rem;
  background: rgb(${(props) => props.theme.colors.primary});
  z-index: 2;
  transform: translateY(-55%);
  font-weight: 500;
  font-size: 1.8rem;
  padding: 0 0.4rem;
  color: black;
`;

export const ChosenTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

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
