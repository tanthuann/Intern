import React from "react";
import { Descriptions } from "antd";

export default function() {
  return (
    <div style={{ border: "1px solid black", margin: "10% auto" }}>
      <Descriptions
        title="User Info"
        layout="vertical"
        style={{ margin: "10%" }}
      >
        <Descriptions.Item label="UserName">Truong Tan Thuan</Descriptions.Item>
        <Descriptions.Item label="Telephone">0931844xxx</Descriptions.Item>
        <Descriptions.Item label="Live">HCM, VietNam</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, VietNam
        </Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
