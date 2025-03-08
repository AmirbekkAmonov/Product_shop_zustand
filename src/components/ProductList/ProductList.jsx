import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { List, Pagination, Spin, Alert, BackTop } from "antd";
import API from "@/utils/API";
import Product from "./Product/Product";

function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const { data, isLoading, error } = useQuery({
        queryKey: ["products", currentPage, pageSize],
        queryFn: async () => {
            const res = await API.get(`/products?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading)
        return (
            <div
                className="loading-container"
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spin size="large">
                    <div style={{ minHeight: "50px" }} />
                </Spin>
            </div>
        );

    if (error) return <Alert message="Error loading products!" type="error" />;

    return (
        <div className="product-list">
            <div className="container">
                <h2>Product List</h2>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data?.products || []}
                    renderItem={(product) => (
                        <List.Item>
                            <Product product={product} />
                        </List.Item>
                    )}
                />

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.total || 0}
                    showSizeChanger
                    onShowSizeChange={(_, size) => {
                        setPageSize(size);
                        setCurrentPage(1);
                    }}
                    onChange={(page) => setCurrentPage(page)}
                    className="pagination"
                />
                <BackTop>
                    <div className="back-to-top">↑</div>
                </BackTop>
            </div>
        </div>
    );
}

export default ProductList;
