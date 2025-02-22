//
// Copyright (c) 2022-2023 Winlin
//
// SPDX-License-Identifier: AGPL-3.0-or-later
//
import React from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import {SrsErrorBoundary} from "../components/SrsErrorBoundary";
import {useErrorHandler} from "react-error-boundary";

export default function Footer() {
  return (
    <SrsErrorBoundary>
      <FooterImpl />
    </SrsErrorBoundary>
  );
}

function FooterImpl() {
  const [versions, setVersions] = React.useState();
  const [beian, setBeian] = React.useState();
  const handleError = useErrorHandler();

  React.useEffect(() => {
    axios.get('/terraform/v1/mgmt/versions')
      .then(res => setVersions(res.data)).catch(handleError);
  }, [handleError]);

  React.useEffect(() => {
    axios.get('/terraform/v1/mgmt/beian/query')
      .then(res => {
        setBeian(res.data.data);
        document.title = res.data.data.title || 'SRS Stack';
        console.log(`Beian: query ${JSON.stringify(res.data.data)}`);
      }).catch(handleError);
  }, [handleError]);

  return (
    <Container>
      <p></p>
      <p className="text-center">
        <a href='https://github.com/ossrs/srs-stack' target='_blank' rel='noreferrer'>
          &copy;srs-stack/v{versions?.data?.version}
        </a>
        &nbsp; <a href='https://beian.miit.gov.cn' target='_blank' rel='noreferrer'>{beian?.icp}</a>
      </p>
    </Container>
  );
}
