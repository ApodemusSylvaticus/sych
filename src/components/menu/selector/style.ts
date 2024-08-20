import styled from 'styled-components';
import { IsActive } from '../../../interface/baseComponentsInterface.ts';

export const Container = styled.div`
  border-radius: 8px;
  display: flex;
  border: 2px solid rgb(${(props) => props.theme.colors.primary});
  background-color: rgba(${(props) => props.theme.colors.primary}, 0.2);
  align-items: center;
  & div:first-child {
    border-radius: 6px 0 0 6px;
  }

  & div:last-child {
    border-radius: 0 6px 6px 0;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 70%;
  border-radius: 20px;
  background-color: rgb(${(props) => props.theme.colors.primary});
`;

export const SelectionButton = styled.div<IsActive>`
  background-color: rgb(${(props) => (props.isActive ? props.theme.colors.tabActive : props.theme.colors.tabDefault)});
  padding: 0.8rem 0;
  transition: background-color 0.25s linear;
  flex: 1;
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  color: rgb(${(props) => props.theme.colors.primary});
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;

  &:hover {
    background-color: rgb(${(props) => (props.isActive ? props.theme.colors.tabActive : props.theme.colors.tabHover)});
  }
`;
