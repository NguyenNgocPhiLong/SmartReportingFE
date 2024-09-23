import React from 'react';
import { Table } from 'antd';


function AntTableCustom(props) {

    return (
        <Table
            columns={props?.columnsTable}
            dataSource={props?.data}
            scroll={{
                x: 1300,
            }}
            pagination={props?.data?.length > 10 ? true : false}
            bordered
        />
    );
};

export default AntTableCustom;
