import BottomSheet from "@gorhom/bottom-sheet";
import { ReactNode, RefObject } from "react";

interface IModal {
    bottomSheetRef: RefObject<BottomSheet | null>;
    snapPoints: Array<string | number>;
    children: ReactNode;
    onClose: () => void;
    onOpen: () => void;
}

export function Modal({bottomSheetRef, snapPoints, children, onClose, onOpen}: IModal) {
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            onChange={(index) => {
                if (index >= 0) {
                    onOpen?.();
                }
                if (index === -1) {
                    onClose?.();
                }
            }}
        >
            {children}
        </BottomSheet>
    )
}
