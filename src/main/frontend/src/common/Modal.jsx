import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./Modal.css"

export default function Modal({ isOpen, setIsOpen, message }) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Content className="modal-content">
                <div className="modal-body">
                    <div className="modal-message">
                        {message}
                    </div>
                    <Dialog.Close asChild>
                        <button className="modal-close-button">확인</button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}