import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { READABLE_DATE_FORMAT, statusses } from '../../constants/common';
import Button from '../../components/Button';

function Claim({
  claim: {
    createdAt, status, description, id,
  }, showButtons, busy, answer,
}) {
  const readableCreatedAt = useMemo(() => format(
    new Date(createdAt),
    READABLE_DATE_FORMAT,
  ), [createdAt]);
  const { colour, label } = statusses[status] || statusses.PENDING;

  return (
    <div className="bg-gray-100 mb-4 p-4 rounded bg-gray-100">
      <div className="flex justify-between text-xs">
        <span>{ readableCreatedAt }</span>
        <span className={`rounded border ${colour} p-1`}>
          { label }
        </span>
      </div>
      <div className="my-4">
        {description}
      </div>
      {
      showButtons && status === statusses.PENDING.value && (
      <div className="flex justify-end">
        <Button value="Deny" onClick={() => answer(statusses.DENIED.value, id)} busy={busy} colour="bg-red-900" />
        <Button value="Approve" onClick={() => answer(statusses.APPROVED.value, id)} busy={busy} className="ml-4" colour="bg-green-900" />
      </div>
      )
    }
    </div>
  )
}

Claim.defaultProps = {
  busy: false,
  showButtons: false,
};

Claim.propTypes = {
  claim: PropTypes.object.isRequired, // eslint-disable-line
  busy: PropTypes.bool,
  showButtons: PropTypes.bool,
  answer: PropTypes.func.isRequired,
};

export default Claim;
