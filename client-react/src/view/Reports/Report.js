import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { NavLink, useNavigate } from 'react-router-dom';
import { READABLE_DATE_FORMAT } from '../../constants/common';
import Button from '../../components/Button';


const Report = ({ report: { itemName, createdAt, id }, allowedToClaim }) => {
  const navigate = useNavigate();
  const readableCreatedAt = useMemo(() => format(new Date(createdAt), READABLE_DATE_FORMAT), [createdAt])
  return <div className="flex text-sm">
    <div className="flex justify-between w-full p-2 rounded bg-slate-300 border border-slate-500 mb-4">
      <div className="pt-3">
        <NavLink to={`${id}`}>{itemName}</NavLink>
      </div>
      <div className="pt-3 rounded text-sm">{readableCreatedAt}</div>
      {allowedToClaim && <div className="">
        <Button onClick={() => navigate(`${id}`)} value="Claim"/>
      </div>}
    </div>
  </div>;
};

Report.propTypes = {
  report : PropTypes.object.isRequired,
  allowedToClaim: PropTypes.bool.isRequired
};

export default Report;
