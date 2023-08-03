import React, { useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { Modal, UncontrolledTooltip } from 'reactstrap';

// Import images
import img1 from '../../../assets/images/product/img-1.png';
import img4 from '../../../assets/images/product/img-4.png';

const OrderTable = () => {

    const [modal_details, setmodal_details] = useState(false);

    function tog_details() {
        setmodal_details(!modal_details);
    }

    return (
        <React.Fragment>
            <Grid
                data={[
                    ["", "#SK2540", "Neal Matthews", "07 Oct, 2021", "$400", "Paid", "Mastercard", "View Details"],
                    ["", "#SK5623", "Jamal Burnett", "05 Oct, 2021", "$452", "Chargeback", "Visa", "View Details"],
                    ["", "#SK6263", "Juan Mitchell", "06 Oct, 2021", "$632", "Refund", "Paypal", "View Details"],
                    ["", "#SK4521", "Barry Dick", "07 Oct, 2021", "$521", "Refund", "COD", "View Details"],
                    ["", "#SK5263", "Ronald Taylor", "07 Oct, 2021", "$521", "Paid", "Mastercard", "View Details"],
                    ["", "#SK4526", "Jacob Hunter", "06 Oct, 2021", "$365", "Chargeback", "Visa", "View Details"],
                    ["", "#SK8965", "William Cruz", "07 Oct, 2021", "$452", "Paid", "Paypal", "View Details"],
                    ["", "#SK9658", "Dustin Moser", "08 Oct, 2021", "$365", "Paid", "COD", "View Details"],
                    ["", "#SK7458", "Clark Benson", "09 Oct, 2021", "$254", "Refund", "COD", "View Details"],
                    ["", "#SK2685", "John Fane", "07 Oct, 2021", "$400", "Paid", "Mastercard", "View Details"],
                    ["", "#SK4526", "Stacie Parker", "05 Oct, 2021", "$452", "Chargeback", "Visa", "View Details"],
                    ["", "#SK8522", "Betty Wilson", "06 Oct, 2021", "$632", "Refund", "Paypal", "View Details"],
                    ["", "#SK4545", "Roman Crabtree", "07 Oct, 2021", "$521", "Refund", "COD", "View Details"],
                    ["", "#SK9652", "Marisela Butler", "07 Oct, 2021", "$521", "Paid", "Mastercard", "View Details"],
                    ["", "#SK4256", "Roger Slayton", "06 Oct, 2021", "$365", "Chargeback", "Visa", "View Details"],
                    ["", "#SK4125", "Barbara Torres", "07 Oct, 2021", "$452", "Paid", "Paypal", "View Details"],
                    ["", "#SK6523", "Daniel Rigney", "08 Oct, 2021", "$365", "Paid", "COD", "View Details"],
                    ["", "#SK6563", "Kenneth Linck", "09 Oct, 2021", "$254", "Refund", "COD", "View Details"],

                ]}
                columns={[
                    {
                        name: '#',
                        sort: {
                            enabled: false
                        },
                        formatter: (cell) => _(<div className="form-check font-size-16"><input className="form-check-input" type="checkbox" id="orderidcheck01" /><label className="form-check-label" htmlFor="orderidcheck01"></label></div>)
                    },
                    {
                        name: 'Order ID',
                        formatter: (cell) => _(<span className="fw-semibold"> {cell} </span>)
                    },
                    "Billing Name", "Date", "Total",
                    {
                        name: 'Payment Status',
                        formatter: (cell) => {
                            switch (cell) {
                                case "Paid":
                                    return _(<span className="badge badge-pill badge-soft-success font-size-12"> {cell} </span>);

                                case "Chargeback":
                                    return _(<span className="badge badge-pill badge-soft-danger font-size-12"> {cell} </span>);

                                case "Refund":
                                    return _(<span className="badge badge-pill badge-soft-warning font-size-12"> {cell} </span>);

                                default:
                                    return _(<span className="badge badge-pill badge-soft-success font-size-12"> {cell} </span>);
                            }
                        }
                    },
                    {
                        name: "Payment Method",
                        formatter: (cell) => {
                            switch (cell) {
                                case "Mastercard":
                                    return _(<><i className="fab fa-cc-mastercard me-2"></i> {cell}</>);
                                case "Visa":
                                    return _(<><i className="fab fa-cc-visa me-2"></i> {cell}</>);
                                case "Paypal":
                                    return _(<><i className="fab fa-cc-paypal me-2"></i> {cell}</>);
                                case "COD":
                                    return _(<><i className="fas fa-money-bill-alt me-2"></i> {cell}</>);
                                default:
                                    return _(<><i className="fas fa-money-bill-alt me-2"></i> {cell}</>);
                            }
                        }
                    },
                    {
                        name: "View Details",
                        formatter: (cell) => _(<button type="button" onClick={() => { tog_details(); }} className="btn btn-primary btn-sm btn-rounded" style={{ paddingInline: 7 }} data-bs-toggle="modal" data-bs-target=".orderdetailsModal"> {cell}  </button>)
                    },
                    {
                        name: "Action",
                        sort: {
                            enabled: false
                        },
                        formatter: (cell) => _(<><div className="d-flex gap-3">
                            <a href="#/" id="Edit" title="Edit" className="text-success">
                                <i className="mdi mdi-pencil font-size-18"></i>
                            </a>

                            <a href="#/" id="Delete" title="Delete" className="text-danger">
                                <i className="mdi mdi-delete font-size-18"></i>
                            </a>
                        </div>

                            <UncontrolledTooltip
                                placement="top"
                                target="Edit"
                            >
                                Edit
                            </UncontrolledTooltip>

                            <UncontrolledTooltip
                                placement="top"
                                target="Delete"
                            >
                                Delete
                            </UncontrolledTooltip>

                        </>)
                    }
                ]}
                search={true}
                sort={true}
                pagination={{
                    enabled: true,
                    limit: 8,
                }}
            />

            {/* View Detail Modal */}

            <Modal isOpen={modal_details} toggle={() => { tog_details(); }} className="orderdetailsModal" centered >
                <div className="modal-header">
                    <h5 className="modal-title" id="orderdetailsModalLabel" > Order Details </h5>
                    <button onClick={() => { setmodal_details(false); }} type="button" className="btn-close" aria-label="Close" >
                    </button>
                </div>
                <div className="modal-body">
                    <p className="mb-2">Product id: <span className="text-primary">#SK2540</span></p>
                    <p className="mb-4">Billing Name: <span className="text-primary">Neal Matthews</span></p>

                    <div className="table-responsive">
                        <table className="table align-middle table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div>
                                            <img src={img1} alt="" className="avatar-md" />
                                        </div>
                                    </th>
                                    <td>
                                        <div>
                                            <h5 className="text-truncate font-size-14">Nike N012 Shoes</h5>
                                            <p className="text-muted mb-0">$ 225 x 1</p>
                                        </div>
                                    </td>
                                    <td>$ 255</td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <div>
                                            <img src={img4} alt="" className="avatar-md" />
                                        </div>
                                    </th>
                                    <td>
                                        <div>
                                            <h5 className="text-truncate font-size-14">Sports S120 Shoes</h5>
                                            <p className="text-muted mb-0">$ 145 x 1</p>
                                        </div>
                                    </td>
                                    <td>$ 145</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h6 className="m-0 text-right">Sub Total:</h6>
                                    </td>
                                    <td>
                                        $ 400
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h6 className="m-0 text-right">Shipping:</h6>
                                    </td>
                                    <td>
                                        Free
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h6 className="m-0 text-right">Total:</h6>
                                    </td>
                                    <td>
                                        $ 400
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setmodal_details(false); }}>Close</button>
                </div>
            </Modal>

        </React.Fragment>
    );
};

export default OrderTable;