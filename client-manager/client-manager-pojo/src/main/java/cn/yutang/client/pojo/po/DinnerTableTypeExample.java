package cn.yutang.client.pojo.po;

import java.util.ArrayList;
import java.util.List;

public class DinnerTableTypeExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public DinnerTableTypeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andTtIdIsNull() {
            addCriterion("tt_id is null");
            return (Criteria) this;
        }

        public Criteria andTtIdIsNotNull() {
            addCriterion("tt_id is not null");
            return (Criteria) this;
        }

        public Criteria andTtIdEqualTo(Integer value) {
            addCriterion("tt_id =", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdNotEqualTo(Integer value) {
            addCriterion("tt_id <>", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdGreaterThan(Integer value) {
            addCriterion("tt_id >", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("tt_id >=", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdLessThan(Integer value) {
            addCriterion("tt_id <", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdLessThanOrEqualTo(Integer value) {
            addCriterion("tt_id <=", value, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdIn(List<Integer> values) {
            addCriterion("tt_id in", values, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdNotIn(List<Integer> values) {
            addCriterion("tt_id not in", values, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdBetween(Integer value1, Integer value2) {
            addCriterion("tt_id between", value1, value2, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtIdNotBetween(Integer value1, Integer value2) {
            addCriterion("tt_id not between", value1, value2, "ttId");
            return (Criteria) this;
        }

        public Criteria andTtNameIsNull() {
            addCriterion("tt_name is null");
            return (Criteria) this;
        }

        public Criteria andTtNameIsNotNull() {
            addCriterion("tt_name is not null");
            return (Criteria) this;
        }

        public Criteria andTtNameEqualTo(String value) {
            addCriterion("tt_name =", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameNotEqualTo(String value) {
            addCriterion("tt_name <>", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameGreaterThan(String value) {
            addCriterion("tt_name >", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameGreaterThanOrEqualTo(String value) {
            addCriterion("tt_name >=", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameLessThan(String value) {
            addCriterion("tt_name <", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameLessThanOrEqualTo(String value) {
            addCriterion("tt_name <=", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameLike(String value) {
            addCriterion("tt_name like", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameNotLike(String value) {
            addCriterion("tt_name not like", value, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameIn(List<String> values) {
            addCriterion("tt_name in", values, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameNotIn(List<String> values) {
            addCriterion("tt_name not in", values, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameBetween(String value1, String value2) {
            addCriterion("tt_name between", value1, value2, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtNameNotBetween(String value1, String value2) {
            addCriterion("tt_name not between", value1, value2, "ttName");
            return (Criteria) this;
        }

        public Criteria andTtCapacityIsNull() {
            addCriterion("tt_capacity is null");
            return (Criteria) this;
        }

        public Criteria andTtCapacityIsNotNull() {
            addCriterion("tt_capacity is not null");
            return (Criteria) this;
        }

        public Criteria andTtCapacityEqualTo(Integer value) {
            addCriterion("tt_capacity =", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityNotEqualTo(Integer value) {
            addCriterion("tt_capacity <>", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityGreaterThan(Integer value) {
            addCriterion("tt_capacity >", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityGreaterThanOrEqualTo(Integer value) {
            addCriterion("tt_capacity >=", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityLessThan(Integer value) {
            addCriterion("tt_capacity <", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityLessThanOrEqualTo(Integer value) {
            addCriterion("tt_capacity <=", value, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityIn(List<Integer> values) {
            addCriterion("tt_capacity in", values, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityNotIn(List<Integer> values) {
            addCriterion("tt_capacity not in", values, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityBetween(Integer value1, Integer value2) {
            addCriterion("tt_capacity between", value1, value2, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andTtCapacityNotBetween(Integer value1, Integer value2) {
            addCriterion("tt_capacity not between", value1, value2, "ttCapacity");
            return (Criteria) this;
        }

        public Criteria andShopIdIsNull() {
            addCriterion("shop_id is null");
            return (Criteria) this;
        }

        public Criteria andShopIdIsNotNull() {
            addCriterion("shop_id is not null");
            return (Criteria) this;
        }

        public Criteria andShopIdEqualTo(Integer value) {
            addCriterion("shop_id =", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotEqualTo(Integer value) {
            addCriterion("shop_id <>", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdGreaterThan(Integer value) {
            addCriterion("shop_id >", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("shop_id >=", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdLessThan(Integer value) {
            addCriterion("shop_id <", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdLessThanOrEqualTo(Integer value) {
            addCriterion("shop_id <=", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdIn(List<Integer> values) {
            addCriterion("shop_id in", values, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotIn(List<Integer> values) {
            addCriterion("shop_id not in", values, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdBetween(Integer value1, Integer value2) {
            addCriterion("shop_id between", value1, value2, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotBetween(Integer value1, Integer value2) {
            addCriterion("shop_id not between", value1, value2, "shopId");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table DinnerTableType
     *
     * @mbg.generated do_not_delete_during_merge
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table DinnerTableType
     *
     * @mbg.generated
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}