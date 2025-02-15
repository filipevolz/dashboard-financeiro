import styled from "styled-components";

export const TopCryptoContainer = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
  padding: 1rem;
`

export const TopCryptoTitle = styled.h2`
  text-align: center;
  margin-bottom:1rem;
`

export const TopCryptoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TopCryptoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    margin-left: auto;
  }
`