import styled from 'styled-components';

export default styled.button`
  /* 로딩 때문에 */
  position: relative;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;

  border: none;
  border-radius: 8px;
  background: rgb(190, 190, 190);

  margin-bottom: 12px;

  /* 파랑색 클릭 효과 제거 */
  &:focus {
    outline: 0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
