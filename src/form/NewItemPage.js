import React from 'react';
import FormPage from './FormPage';
import * as Yup from 'yup';
import styled from 'styled-components';
import { categoryItems } from '../dummy';
import { connect } from 'react-redux';
import { isLoading, postForm } from '../redux/forms';

const schema = Yup.object().shape({
  name: Yup.string().required('제목을 입력해주세요'),
  category: Yup.string().required('분류를 선택해주세요'),
  requirements: Yup.string(),
  beginDate: Yup.date(),
  endDate: Yup.date(),
  location: Yup.string().required('위치를 입력해주세요'),
  benefit: Yup.string().required('혜택을 입력해주세요'),
  target: Yup.string(),
  tel: Yup.string(),
  description: Yup.string(),
  reference: Yup.string(),
  link: Yup.string()
  //image,note
});

const initialValues = {
  name: '',
  category: categoryItems[0].name,
  requirements: '',
  beginDate: '',
  endDate: '',
  reference: '',
  image: '',
  link: '',
  location: '',
  benefit: '',
  target: '',
  tel: '',
  note: '',
  description: ''
};

// type이 있으면 type만 쓰고 끝남
// component가 있고 Select면 그렇게 렌더링 (얘 밖에 없음 일단)
const fields = [
  {
    name: 'name',
    label: '제목',
    autoFocus: true
  },
  {
    name: 'category',
    label: '분류',
    component: 'select',
    // 카테고리 상수들을 불러옴
    options: categoryItems.map(item => ({
      value: item.name,
      text: item.name
    }))
  },
  {
    name: 'requirements',
    label: '조건'
  },
  {
    name: 'beginDate',
    label: '시작일',
    type: 'date'
  },
  {
    name: 'endDate',
    label: '종료일',
    type: 'date'
  },
  {
    name: 'location',
    label: '위치'
  },
  {
    name: 'benefit',
    label: '혜택'
  },
  {
    name: 'target',
    label: '대상'
  },
  {
    name: 'tel',
    label: '전화번호'
  },
  {
    name: 'reference',
    label: '출처'
  },
  {
    name: 'link',
    label: '웹사이트'
  },
  {
    name: 'description',
    component: 'textarea',
    label: '상세 설명'
  }
];

const container = styled.div`
  margin: 24px 0;

  font-size: 18px;

  display: flex;
  flex-direction: column;

  & label {
    min-width: 80px;
    text-align: left;
  }

  & > span {
    display: block;
    color: red;
    text-align: right;
  }

  & > span:before {
    content: '* ';
  }

  & input,
  & select,
  & textarea {
    border-radius: 4px;
    border: 1px solid rgb(200, 200, 200);
    font-size: 18px;
    max-width: calc(100% - 80px);
  }

  & textarea {
    width: 100%;
    height: 220px;
  }
`;

class NewItemPage extends React.Component {
  handleSubmit = values => {
    const dataToSend = {
      ...values,
      accepted: false
    };
    console.log(dataToSend);

    const { postForm, history } = this.props;
    postForm('/addRequests', dataToSend).then(history.goBack);
  };

  render() {
    const { history } = this.props;
    const { isLoading } = this.props;

    return (
      <div>
        <FormPage
          history={history}
          title="내 가게 등록하기"
          schema={schema}
          initialValues={initialValues}
          fields={fields}
          onSubmit={this.handleSubmit}
          container={container}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoading(state)
});

const mapDispatchToProps = {
  postForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewItemPage);
