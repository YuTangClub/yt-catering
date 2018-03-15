package cn.yutang.backend.pojo.po;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
@Component
@Scope(value = "prototype")
public class FoodordersExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public FoodordersExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
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
     * This method corresponds to the database table FoodOrders
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
     * This method corresponds to the database table FoodOrders
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table FoodOrders
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
     * This class corresponds to the database table FoodOrders
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

        protected void addCriterionForJDBCDate(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value.getTime()), property);
        }

        protected void addCriterionForJDBCDate(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                dateList.add(new java.sql.Date(iter.next().getTime()));
            }
            addCriterion(condition, dateList, property);
        }

        protected void addCriterionForJDBCDate(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value1.getTime()), new java.sql.Date(value2.getTime()), property);
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

        public Criteria andTbIdIsNull() {
            addCriterion("tb_id is null");
            return (Criteria) this;
        }

        public Criteria andTbIdIsNotNull() {
            addCriterion("tb_id is not null");
            return (Criteria) this;
        }

        public Criteria andTbIdEqualTo(Integer value) {
            addCriterion("tb_id =", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdNotEqualTo(Integer value) {
            addCriterion("tb_id <>", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdGreaterThan(Integer value) {
            addCriterion("tb_id >", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("tb_id >=", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdLessThan(Integer value) {
            addCriterion("tb_id <", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdLessThanOrEqualTo(Integer value) {
            addCriterion("tb_id <=", value, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdIn(List<Integer> values) {
            addCriterion("tb_id in", values, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdNotIn(List<Integer> values) {
            addCriterion("tb_id not in", values, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdBetween(Integer value1, Integer value2) {
            addCriterion("tb_id between", value1, value2, "tbId");
            return (Criteria) this;
        }

        public Criteria andTbIdNotBetween(Integer value1, Integer value2) {
            addCriterion("tb_id not between", value1, value2, "tbId");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeIsNull() {
            addCriterion("or_beginTime is null");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeIsNotNull() {
            addCriterion("or_beginTime is not null");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeEqualTo(Date value) {
            addCriterionForJDBCDate("or_beginTime =", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeNotEqualTo(Date value) {
            addCriterionForJDBCDate("or_beginTime <>", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeGreaterThan(Date value) {
            addCriterionForJDBCDate("or_beginTime >", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("or_beginTime >=", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeLessThan(Date value) {
            addCriterionForJDBCDate("or_beginTime <", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("or_beginTime <=", value, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeIn(List<Date> values) {
            addCriterionForJDBCDate("or_beginTime in", values, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeNotIn(List<Date> values) {
            addCriterionForJDBCDate("or_beginTime not in", values, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("or_beginTime between", value1, value2, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrBegintimeNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("or_beginTime not between", value1, value2, "orBegintime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeIsNull() {
            addCriterion("or_endTime is null");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeIsNotNull() {
            addCriterion("or_endTime is not null");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeEqualTo(Date value) {
            addCriterionForJDBCDate("or_endTime =", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeNotEqualTo(Date value) {
            addCriterionForJDBCDate("or_endTime <>", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeGreaterThan(Date value) {
            addCriterionForJDBCDate("or_endTime >", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("or_endTime >=", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeLessThan(Date value) {
            addCriterionForJDBCDate("or_endTime <", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("or_endTime <=", value, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeIn(List<Date> values) {
            addCriterionForJDBCDate("or_endTime in", values, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeNotIn(List<Date> values) {
            addCriterionForJDBCDate("or_endTime not in", values, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("or_endTime between", value1, value2, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrEndtimeNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("or_endTime not between", value1, value2, "orEndtime");
            return (Criteria) this;
        }

        public Criteria andOrStatusIsNull() {
            addCriterion("or_status is null");
            return (Criteria) this;
        }

        public Criteria andOrStatusIsNotNull() {
            addCriterion("or_status is not null");
            return (Criteria) this;
        }

        public Criteria andOrStatusEqualTo(Integer value) {
            addCriterion("or_status =", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusNotEqualTo(Integer value) {
            addCriterion("or_status <>", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusGreaterThan(Integer value) {
            addCriterion("or_status >", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("or_status >=", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusLessThan(Integer value) {
            addCriterion("or_status <", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusLessThanOrEqualTo(Integer value) {
            addCriterion("or_status <=", value, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusIn(List<Integer> values) {
            addCriterion("or_status in", values, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusNotIn(List<Integer> values) {
            addCriterion("or_status not in", values, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusBetween(Integer value1, Integer value2) {
            addCriterion("or_status between", value1, value2, "orStatus");
            return (Criteria) this;
        }

        public Criteria andOrStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("or_status not between", value1, value2, "orStatus");
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

        public Criteria andShopIdEqualTo(String value) {
            addCriterion("shop_id =", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotEqualTo(String value) {
            addCriterion("shop_id <>", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdGreaterThan(String value) {
            addCriterion("shop_id >", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdGreaterThanOrEqualTo(String value) {
            addCriterion("shop_id >=", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdLessThan(String value) {
            addCriterion("shop_id <", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdLessThanOrEqualTo(String value) {
            addCriterion("shop_id <=", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdLike(String value) {
            addCriterion("shop_id like", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotLike(String value) {
            addCriterion("shop_id not like", value, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdIn(List<String> values) {
            addCriterion("shop_id in", values, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotIn(List<String> values) {
            addCriterion("shop_id not in", values, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdBetween(String value1, String value2) {
            addCriterion("shop_id between", value1, value2, "shopId");
            return (Criteria) this;
        }

        public Criteria andShopIdNotBetween(String value1, String value2) {
            addCriterion("shop_id not between", value1, value2, "shopId");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table FoodOrders
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
     * This class corresponds to the database table FoodOrders
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