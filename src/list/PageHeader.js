import React from 'react';
import styled from 'styled-components';
import { locationItems, categoryItems } from '../dummy';
import { SubTitle, NoPaddingZone } from '../common/Common';

const Header = styled.div`
  padding: 10px 30px 0px 30px;

  /* 레이아웃 */
  z-index: 999;
  position: fixed;
  top: 57px;
  left: 0;
  right: 0;

  background: white;
`;

const LocationBox = styled.div`
  display: flex;
`;

const Select = styled.select`
  width: 150px;
  border: none;
  font-size: 20px;
  color: #028090;
  background: white;
`;

const Divider = styled.div`
  margin-top: 24px;
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);
`;

const PageHeader = ({ title, showSelectBox, onChangeValue, selectedValue }) => {
  return (
    <Header>
      <SubTitle>{`#${title}`}</SubTitle>
      {showSelectBox && (
        <LocationBox>
          {title === '위치별' && (
            <React.Fragment>
              <i
                className={`flaticon-placeholder`}
                style={{ color: '#00A896', fontSize: 22 }}
              />
              <Select onChange={onChangeValue}>
                {locationItems.map(location => (
                  <option
                    value={location}
                    selected={location === selectedValue}
                  >
                    {location}
                  </option>
                ))}
              </Select>
            </React.Fragment>
          )}
          {/* 선택된 값에 대해 아이콘을 표시하도록 */}
          {title === '분류별' && (
            <Select onChange={onChangeValue}>
              {categoryItems.map(({ icon, name }) => (
                <option value={name} selected={name === selectedValue}>
                  {name}
                </option>
              ))}
            </Select>
          )}
        </LocationBox>
      )}
      <NoPaddingZone>
        <Divider />
      </NoPaddingZone>
    </Header>
  );
};

export default PageHeader;
