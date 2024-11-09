import { useEffect, useState } from "react";
import { TableProperties } from "./Table.properties";
import { Alert, Pagination, Spinner, Table } from "react-bootstrap";
import { PaginationDto } from "../../types/pagination";

const TableComponent = <T,>({ columns, renderRow, fetchData, pageSize = 10 }: TableProperties<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async (currentPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const response: PaginationDto<T> = await fetchData(currentPage, pageSize);
            setData(response.data);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(page);
    }, [page]);

    const paginationItems = [];
    for (let number = 0; number < totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === page}
                onClick={() => setPage(number)}
            >
                {number + 1}
            </Pagination.Item>
        );
    }

    return (
        <div>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>{renderRow(item)}</tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>{paginationItems}</Pagination>
                </>
            )}
        </div>
    );
};

export default TableComponent;
