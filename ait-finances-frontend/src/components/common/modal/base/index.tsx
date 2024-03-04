import { PropsWithChildren } from "react";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
// icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ModalDialogProps } from "tw-elements-react/dist/types/components/Modal/ModalDialog/types";
import { createPortal } from "react-dom";
import { SimpleBtn } from "@common-components/buttons";

interface BaseModalProps {
  title?: string;
  show: boolean;
  onClose: () => void;
  actionTitle?: string;
  onAction?: () => void;
  enableFullSCreen?: boolean;
  dialogProps?: ModalDialogProps;
  withPortal?: boolean;
  size?: "fullscreen" | "sm" | "lg" | "xl" | undefined;
}

function ModalDialogScrollable({
  show = true,
  onClose,
  title,
  actionTitle,
  onAction,
  dialogProps = { size: "fullscreen" },
  children
}: PropsWithChildren<BaseModalProps>) {
  return (
    <TEModal show={show} setShow={() => onClose()}>
      <TEModalDialog {...dialogProps}>
        <TEModalContent style={{ backgroundColor: "white", ...(dialogProps?.size === "fullscreen" ? { height: "100%" } : {}) }}>
          <TEModalHeader>
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-950">{title ?? "Modal title"}</h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              <IoIosCloseCircleOutline className="w-6 h-6" />
            </button>
          </TEModalHeader>
          {/* <!--Modal body--> */}
          <TEModalBody>{children}</TEModalBody>
          {/* <!--Modal footer--> */}
          <TEModalFooter>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={onClose}
              >
                Close
              </button>
            </TERipple>
            {Boolean(actionTitle) && (
              <TERipple rippleColor="light">
                <SimpleBtn theme="red" type="button" onClick={onAction}>
                  {actionTitle}
                </SimpleBtn>
              </TERipple>
            )}
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

export default function BaseModal({ ...props }: PropsWithChildren<BaseModalProps>) {
  return props.withPortal ? (
    createPortal(<ModalDialogScrollable {...props} />, document.getElementById("root") as HTMLElement)
  ) : (
    <ModalDialogScrollable {...props} />
  );
}
