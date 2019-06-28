import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import GoBackBtn from '../common/GoBackBtn';
import LoadingPrimaryBtn from '../common/LoadingPrimaryBtn';

const FormContainer = styled.div`
  margin-top: 60px;
`;

const Title = styled.h1`
  font-family: 'yg-jalnan', sans-serif;
  font-size: 22px;
  text-align: center;

  margin: 0px;
  margin-bottom: 4px;

  border: solid #05668d;
  border-width: 2px 0px;

  background: white;
  color: #05668d;

  position: fixed;
  top: 57px;
  left: 0;
  right: 0;

  line-height: 2.4;
  height: 50px;
`;

export default ({
  history,
  title,
  schema,
  initialValues,
  fields,
  onSubmit,
  isLoading,
  container: Container
}) => (
  <FormContainer>
    <Title>{`#${title}`}</Title>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          {fields.map(
            ({ name, label, type, component, options, autoFocus }) => (
              <Container>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <label>{label}</label>
                  <Field
                    name={name}
                    {...type && { type }}
                    {...component && { component }}
                    autoFocus={autoFocus}
                  >
                    {options &&
                      options.map(({ value, text }) => (
                        <option value={value}>{text}</option>
                      ))}
                  </Field>
                </div>
                {errors[name] && touched[name] ? (
                  <span>{errors[name]}</span>
                ) : null}
              </Container>
            )
          )}
          <LoadingPrimaryBtn isLoading={isLoading} text="제출" type="submit" />
          <GoBackBtn onClick={history.goBack} />
        </Form>
      )}
    </Formik>
  </FormContainer>
);
