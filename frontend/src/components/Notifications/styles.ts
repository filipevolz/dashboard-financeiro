import styled from "styled-components";

export const NotificationsContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotificationsCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${(props) => props.theme["green-300"]};
  color: ${(props) => props.theme.white};
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
`