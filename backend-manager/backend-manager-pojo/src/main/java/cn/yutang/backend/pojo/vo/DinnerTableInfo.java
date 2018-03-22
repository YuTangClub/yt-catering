package cn.yutang.backend.pojo.vo;

import cn.yutang.backend.pojo.po.DinnerTable;

import cn.yutang.backend.pojo.po.DinnerTableType;

public class DinnerTableInfo extends DinnerTable{


    private String ttName;
    private Integer ttCapacity;

    public String getTtName() {
        return ttName;
    }

    public void setTtName(String ttName) {
        this.ttName = ttName;
    }

    public Integer getTtCapacity() {
        return ttCapacity;
    }

    public void setTtCapacity(Integer ttCapacity) {
        this.ttCapacity = ttCapacity;
    }
}
