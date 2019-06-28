import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  /* top은 좀 작게 */
  padding: 10px 30px 30px 30px;

  /* Header 공간 비우기 */
  margin-top: 57px;

  /* 드래그 못 하게 */
  * {
    user-select: none;
  }
`;
