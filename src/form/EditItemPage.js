import React from 'react';
import FormPage from './FormPage';
import * as Yup from 'yup';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isLoading, postForm } from '../redux/forms';

const schema = Yup.object().shape({
  content: Yup.string().required('내용을 입력해주세요')
});

const initialValues = {
  content: ''
};

const fields = [
  {
    name: 'content',
    component: 'textarea',
    label: '정정 사항',
    autoFocus: true
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

const getItemIdFromPath = props => {
  const { pathname } = props.location;
  let id = pathname.split('/')[2];
  return parseInt(id, 10);
};

class EditItemPage extends React.Component {
  handleSubmit = values => {
    const eventId = getItemIdFromPath(this.props);
    if (!eventId) throw Error('잘못된 요청입니다.');

    const dataToSend = {
      ...values,
      eventId,
      accepted: false
    };
    console.log(dataToSend);

    const { postForm, history } = this.props;
    postForm('/updateRequests', dataToSend).then(history.goBack);
  };

  render() {
    const { history } = this.props;
    const { isLoading } = this.props;

    return (
      <div>
        <FormPage
          history={history}
          title="정정 요청"
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
)(EditItemPage);
