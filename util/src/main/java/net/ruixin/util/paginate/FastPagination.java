package net.ruixin.util.paginate;

import java.io.Serializable;
import java.util.List;

public class FastPagination<T> implements Serializable {

    /**
     * 每页条数
     */
    private int pageSize;

    /**
     * 是否有下一条
     */
    private boolean hasNext;

    /**
     * 对象列表
     */
    private List<T> rows;

    /**
     * 总页数
     */
    private Integer total;

    public FastPagination(){

    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean isHasNext() {
        return hasNext;
    }

    public void setHasNext(boolean hasNext) {
        this.hasNext = hasNext;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
