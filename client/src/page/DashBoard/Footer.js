import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Footer = () => {
 

  return (
    <Wrapper >
      <Content>
        <Logo>Codeforces</Logo>
        <Text>
          Codeforces is a platform for competitive programming and coding contests. It provides a community-driven environment for programmers to improve their skills and participate in challenging competitions.
        </Text>
      </Content>
      <Copyright>
        &copy; {new Date().getFullYear()} Codeforces. All rights reserved.
      </Copyright>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background: #1F1F1F;
  padding: 20px;
  color: #EEEEEE;
  text-align: center;
 dth: 100%;

`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: #EEEEEE;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Copyright = styled.p`
  font-size: 12px;
  margin-top: 20px;
`;

export default Footer;
