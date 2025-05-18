import { SnackbarKey, useSnackbar } from "notistack";
import React, { Fragment } from "react";

export const DismissNotification: React.FC<{ id: SnackbarKey }> = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <Fragment>
      <div onClick={() => closeSnackbar(id)}>
      </div>
    </Fragment>
  );
};
