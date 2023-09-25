import React, { CSSProperties } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  customStyling?: CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({ customStyling = {} }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper onClick={handleGoBack} style={customStyling}>
      <ArrowBackIosIcon fontSize="small" />
    </Wrapper>
  );
};

export default BackButton;

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  width: auto;
  max-width: 20px;
  background-color: white;
  position: absolute;
  top: 80px;
  left: 50px;

  & > svg {
    vertical-align: middle;
    display: inline-block;
    padding-left: 30%;
  }
`;
