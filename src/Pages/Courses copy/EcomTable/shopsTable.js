import React, { useEffect, useMemo } from 'react';

import {
    getShops as onGetShops,
  } from "../../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '../../../components/Common/TableContainer';
import { Link } from 'react-router-dom';

const ShopsTable = () => {
    const dispatch = useDispatch();
    const { shops } = useSelector(state => ({
      shops: state.Ecommerce.shops,
    }));
    useEffect(() => {
        if (shops && !shops.length) {
          dispatch(onGetShops());
        }
      }, [dispatch, shops]);

      const columns = useMemo(
        () => [
    
          {
            Header: 'Brand',
            accessor: 'firstLetter',
            // width: '150px',
            Filter: false,
            Cell: (cell) => {
                switch (cell.value) {
                    case "M":
                        return <div className="avatar"><span className="avatar-title bg-soft-primary text-primary font-size-16 rounded-circle"> {cell.value} </span></div>;

                    case "B":
                        return <div className="avatar"><span className="avatar-title bg-soft-warning text-warning font-size-16 rounded-circle"> {cell.value} </span></div>;

                    case "K":
                        return <div className="avatar"><span className="avatar-title bg-soft-success text-success font-size-16 rounded-circle"> {cell.value} </span></div>;

                    case "P":
                        return <div className="avatar"><span className="avatar-title bg-soft-danger text-danger font-size-16 rounded-circle"> {cell.value} </span></div>;

                    default:
                        return <div className="avatar"><span className="avatar-title bg-soft-primary text-primary font-size-16 rounded-circle">{cell.value}</span></div>;
                }
            }
          },
          {
            Header: 'Name',
            filterable: true,
            Cell: (cell) => {
              return (
                <span>
                    <h5 className="font-size-15">
                        {cell.row.original.name}
                        </h5>
                    <p className="text-muted mb-0"> <i className="mdi mdi-account me-1"></i>{cell.row.original.subtitle}</p></span>
              )
            }
          },
          {
            Header: 'Email',
            accessor: 'email',
            filterable: true,
            Filter: false,
          },
          {
            Header: 'Date',
            accessor: 'date',
            Filter: false,
          },
          {
            Header: 'Product',
            accessor: 'product',
            Filter: false,
          },
          {
            Header: 'Current Balance',
            accessor: 'balance',
            Filter: false,
          },
          {
            Header: 'Action',
            accessor: 'action',
            disableFilters: true,
            Cell: (cellProps) => {
              return (
                <span>
                    <div className="d-flex gap-3">
                        <Link to="#" className="text-success">
                            <i className="mdi mdi-pencil font-size-18 text-success"></i>
                        </Link> 
                        <Link to="#" className="text-danger">
                            <i className="mdi mdi-delete font-size-18 text-danger"></i>
                        </Link>
                    </div>
                </span>
              );
            }
          },
        ],
        []
      );
    
    return (
        <React.Fragment>
             <TableContainer
                    columns={columns}
                    data={shops}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="custom-header-css"
                  />

        </React.Fragment>
    );
};

export default ShopsTable;