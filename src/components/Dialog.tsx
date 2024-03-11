import { HTMLProps, ReactElement } from 'react';
import styled from 'styled-components';
import { CloseIcon } from './icon';

const DialogBG = styled.div<{ $opend: boolean }>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: end;
  pointer-events: none;

  transition: all 0.1s ease-out;

  & > div {
    transform: translateY(${({ $opend }) => ($opend ? 0 : '100%')});
  }
`;

const DialogBody = styled.div`
  max-width: 100%;
  width: 90%;
  height: 20%;
  background-color: var(--primary);
  border-radius: 30px 30px 0 0;
  transition: all 0.1s ease-out;
  pointer-events: all;
`;

const CloseButton = styled(CloseIcon)`
  font-size: 40px;
  color: var(--background);
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

interface DialogProps extends HTMLProps<HTMLDivElement> {
  opend: boolean;
  children: ReactElement;
  close: () => void;
}

const Dialog = (props: DialogProps): ReactElement => {
  const { children, opend, close, ...rest } = props;

  return (
    <DialogBG $opend={opend}>
      <DialogBody {...rest}>
        {children}
        <CloseButton onClick={close} />
      </DialogBody>
    </DialogBG>
  );
};

export default Dialog;
