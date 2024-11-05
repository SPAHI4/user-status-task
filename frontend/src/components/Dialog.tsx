import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
} & React.ComponentProps<'dialog'>;

export function Dialog({ isOpen, onClose, children, title, ...rest }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="p-0 border-none rounded bg-transparent flex items-center justify-center backdrop:bg-black/50 [&:not([open])]:hidden"
      {...rest}
    >
      <div className="bg-white rounded w-[480px] max-h-[90vh] overflow-auto relative">
        {title && (
          <header className="p-6 border-b border-gray-200 grid grid-cols-[1fr_auto]">
            <h5 className="text-lg font-medium">{title}</h5>
            <X
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
              size={20}
            />
          </header>
        )}
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
}
