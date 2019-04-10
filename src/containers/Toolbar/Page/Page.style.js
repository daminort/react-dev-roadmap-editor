import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  
  #pageWidth,
  #pageHeight {
  	width: 100px;
  	margin-right: 12px;
  	.p-spinner {
  		width: 100%;
  		.p-inputtext {
  			width: 100px;
  		}
  	} 
  }
`;

export const Label = styled.div`
	display: flex;
	align-items: center;
	margin-right: 8px;
`;
