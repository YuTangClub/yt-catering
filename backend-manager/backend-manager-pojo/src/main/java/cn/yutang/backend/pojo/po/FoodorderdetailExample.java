package cn.yutang.backend.pojo.po;

import java.util.ArrayList;
import java.util.List;

public class FoodorderdetailExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public FoodorderdetailExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
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
     * This method corresponds to the database table FoodOrderDetail
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
     * This method corresponds to the database table FoodOrderDetail
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrderDetail
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
     * This class corresponds to the database table FoodOrderDetail
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

        public Criteria andOdIdIsNull() {
            addCriterion("od_id is null");
            return (Criteria) this;
        }

        public Criteria andOdIdIsNotNull() {
            addCriterion("od_id is not null");
            return (Criteria) this;
        }

        public Criteria andOdIdEqualTo(String value) {
            addCriterion("od_id =", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdNotEqualTo(String value) {
            addCriterion("od_id <>", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdGreaterThan(String value) {
            addCriterion("od_id >", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdGreaterThanOrEqualTo(String value) {
            addCriterion("od_id >=", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdLessThan(String value) {
            addCriterion("od_id <", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdLessThanOrEqualTo(String value) {
            addCriterion("od_id <=", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdLike(String value) {
            addCriterion("od_id like", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdNotLike(String value) {
            addCriterion("od_id not like", value, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdIn(List<String> values) {
            addCriterion("od_id in", values, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdNotIn(List<String> values) {
            addCriterion("od_id not in", values, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdBetween(String value1, String value2) {
            addCriterion("od_id between", value1, value2, "odId");
            return (Criteria) this;
        }

        public Criteria andOdIdNotBetween(String value1, String value2) {
            addCriterion("od_id not between", value1, value2, "odId");
            return (Criteria) this;
        }

        public Criteria andOrIdIsNull() {
            addCriterion("or_id is null");
            return (Criteria) this;
        }

        public Criteria andOrIdIsNotNull() {
            addCriterion("or_id is not null");
            return (Criteria) this;
        }

        public Criteria andOrIdEqualTo(String value) {
            addCriterion("or_id =", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdNotEqualTo(String value) {
            addCriterion("or_id <>", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdGreaterThan(String value) {
            addCriterion("or_id >", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdGreaterThanOrEqualTo(String value) {
            addCriterion("or_id >=", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdLessThan(String value) {
            addCriterion("or_id <", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdLessThanOrEqualTo(String value) {
            addCriterion("or_id <=", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdLike(String value) {
            addCriterion("or_id like", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdNotLike(String value) {
            addCriterion("or_id not like", value, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdIn(List<String> values) {
            addCriterion("or_id in", values, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdNotIn(List<String> values) {
            addCriterion("or_id not in", values, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdBetween(String value1, String value2) {
            addCriterion("or_id between", value1, value2, "orId");
            return (Criteria) this;
        }

        public Criteria andOrIdNotBetween(String value1, String value2) {
            addCriterion("or_id not between", value1, value2, "orId");
            return (Criteria) this;
        }

        public Criteria andFdIdIsNull() {
            addCriterion("fd_id is null");
            return (Criteria) this;
        }

        public Criteria andFdIdIsNotNull() {
            addCriterion("fd_id is not null");
            return (Criteria) this;
        }

        public Criteria andFdIdEqualTo(String value) {
            addCriterion("fd_id =", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotEqualTo(String value) {
            addCriterion("fd_id <>", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThan(String value) {
            addCriterion("fd_id >", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThanOrEqualTo(String value) {
            addCriterion("fd_id >=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThan(String value) {
            addCriterion("fd_id <", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThanOrEqualTo(String value) {
            addCriterion("fd_id <=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLike(String value) {
            addCriterion("fd_id like", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotLike(String value) {
            addCriterion("fd_id not like", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdIn(List<String> values) {
            addCriterion("fd_id in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotIn(List<String> values) {
            addCriterion("fd_id not in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdBetween(String value1, String value2) {
            addCriterion("fd_id between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotBetween(String value1, String value2) {
            addCriterion("fd_id not between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdCountIsNull() {
            addCriterion("fd_count is null");
            return (Criteria) this;
        }

        public Criteria andFdCountIsNotNull() {
            addCriterion("fd_count is not null");
            return (Criteria) this;
        }

        public Criteria andFdCountEqualTo(Integer value) {
            addCriterion("fd_count =", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountNotEqualTo(Integer value) {
            addCriterion("fd_count <>", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountGreaterThan(Integer value) {
            addCriterion("fd_count >", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountGreaterThanOrEqualTo(Integer value) {
            addCriterion("fd_count >=", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountLessThan(Integer value) {
            addCriterion("fd_count <", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountLessThanOrEqualTo(Integer value) {
            addCriterion("fd_count <=", value, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountIn(List<Integer> values) {
            addCriterion("fd_count in", values, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountNotIn(List<Integer> values) {
            addCriterion("fd_count not in", values, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountBetween(Integer value1, Integer value2) {
            addCriterion("fd_count between", value1, value2, "fdCount");
            return (Criteria) this;
        }

        public Criteria andFdCountNotBetween(Integer value1, Integer value2) {
            addCriterion("fd_count not between", value1, value2, "fdCount");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table FoodOrderDetail
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
     * This class corresponds to the database table FoodOrderDetail
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