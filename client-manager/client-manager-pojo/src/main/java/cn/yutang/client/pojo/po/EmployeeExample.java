package cn.yutang.client.pojo.po;

import java.util.ArrayList;
import java.util.List;

public class EmployeeExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Employee
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Employee
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Employee
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public EmployeeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
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
     * This method corresponds to the database table Employee
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
     * This method corresponds to the database table Employee
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee
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
     * This class corresponds to the database table Employee
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

        public Criteria andEmpIdIsNull() {
            addCriterion("emp_id is null");
            return (Criteria) this;
        }

        public Criteria andEmpIdIsNotNull() {
            addCriterion("emp_id is not null");
            return (Criteria) this;
        }

        public Criteria andEmpIdEqualTo(Integer value) {
            addCriterion("emp_id =", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdNotEqualTo(Integer value) {
            addCriterion("emp_id <>", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdGreaterThan(Integer value) {
            addCriterion("emp_id >", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("emp_id >=", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdLessThan(Integer value) {
            addCriterion("emp_id <", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdLessThanOrEqualTo(Integer value) {
            addCriterion("emp_id <=", value, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdIn(List<Integer> values) {
            addCriterion("emp_id in", values, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdNotIn(List<Integer> values) {
            addCriterion("emp_id not in", values, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdBetween(Integer value1, Integer value2) {
            addCriterion("emp_id between", value1, value2, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpIdNotBetween(Integer value1, Integer value2) {
            addCriterion("emp_id not between", value1, value2, "empId");
            return (Criteria) this;
        }

        public Criteria andEmpNameIsNull() {
            addCriterion("emp_name is null");
            return (Criteria) this;
        }

        public Criteria andEmpNameIsNotNull() {
            addCriterion("emp_name is not null");
            return (Criteria) this;
        }

        public Criteria andEmpNameEqualTo(String value) {
            addCriterion("emp_name =", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameNotEqualTo(String value) {
            addCriterion("emp_name <>", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameGreaterThan(String value) {
            addCriterion("emp_name >", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameGreaterThanOrEqualTo(String value) {
            addCriterion("emp_name >=", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameLessThan(String value) {
            addCriterion("emp_name <", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameLessThanOrEqualTo(String value) {
            addCriterion("emp_name <=", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameLike(String value) {
            addCriterion("emp_name like", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameNotLike(String value) {
            addCriterion("emp_name not like", value, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameIn(List<String> values) {
            addCriterion("emp_name in", values, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameNotIn(List<String> values) {
            addCriterion("emp_name not in", values, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameBetween(String value1, String value2) {
            addCriterion("emp_name between", value1, value2, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNameNotBetween(String value1, String value2) {
            addCriterion("emp_name not between", value1, value2, "empName");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameIsNull() {
            addCriterion("emp_nickname is null");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameIsNotNull() {
            addCriterion("emp_nickname is not null");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameEqualTo(String value) {
            addCriterion("emp_nickname =", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameNotEqualTo(String value) {
            addCriterion("emp_nickname <>", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameGreaterThan(String value) {
            addCriterion("emp_nickname >", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameGreaterThanOrEqualTo(String value) {
            addCriterion("emp_nickname >=", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameLessThan(String value) {
            addCriterion("emp_nickname <", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameLessThanOrEqualTo(String value) {
            addCriterion("emp_nickname <=", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameLike(String value) {
            addCriterion("emp_nickname like", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameNotLike(String value) {
            addCriterion("emp_nickname not like", value, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameIn(List<String> values) {
            addCriterion("emp_nickname in", values, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameNotIn(List<String> values) {
            addCriterion("emp_nickname not in", values, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameBetween(String value1, String value2) {
            addCriterion("emp_nickname between", value1, value2, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpNicknameNotBetween(String value1, String value2) {
            addCriterion("emp_nickname not between", value1, value2, "empNickname");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordIsNull() {
            addCriterion("emp_password is null");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordIsNotNull() {
            addCriterion("emp_password is not null");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordEqualTo(String value) {
            addCriterion("emp_password =", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordNotEqualTo(String value) {
            addCriterion("emp_password <>", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordGreaterThan(String value) {
            addCriterion("emp_password >", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("emp_password >=", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordLessThan(String value) {
            addCriterion("emp_password <", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordLessThanOrEqualTo(String value) {
            addCriterion("emp_password <=", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordLike(String value) {
            addCriterion("emp_password like", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordNotLike(String value) {
            addCriterion("emp_password not like", value, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordIn(List<String> values) {
            addCriterion("emp_password in", values, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordNotIn(List<String> values) {
            addCriterion("emp_password not in", values, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordBetween(String value1, String value2) {
            addCriterion("emp_password between", value1, value2, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpPasswordNotBetween(String value1, String value2) {
            addCriterion("emp_password not between", value1, value2, "empPassword");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityIsNull() {
            addCriterion("emp_authority is null");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityIsNotNull() {
            addCriterion("emp_authority is not null");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityEqualTo(Integer value) {
            addCriterion("emp_authority =", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityNotEqualTo(Integer value) {
            addCriterion("emp_authority <>", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityGreaterThan(Integer value) {
            addCriterion("emp_authority >", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityGreaterThanOrEqualTo(Integer value) {
            addCriterion("emp_authority >=", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityLessThan(Integer value) {
            addCriterion("emp_authority <", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityLessThanOrEqualTo(Integer value) {
            addCriterion("emp_authority <=", value, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityIn(List<Integer> values) {
            addCriterion("emp_authority in", values, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityNotIn(List<Integer> values) {
            addCriterion("emp_authority not in", values, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityBetween(Integer value1, Integer value2) {
            addCriterion("emp_authority between", value1, value2, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpAuthorityNotBetween(Integer value1, Integer value2) {
            addCriterion("emp_authority not between", value1, value2, "empAuthority");
            return (Criteria) this;
        }

        public Criteria andEmpTelIsNull() {
            addCriterion("emp_tel is null");
            return (Criteria) this;
        }

        public Criteria andEmpTelIsNotNull() {
            addCriterion("emp_tel is not null");
            return (Criteria) this;
        }

        public Criteria andEmpTelEqualTo(String value) {
            addCriterion("emp_tel =", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelNotEqualTo(String value) {
            addCriterion("emp_tel <>", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelGreaterThan(String value) {
            addCriterion("emp_tel >", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelGreaterThanOrEqualTo(String value) {
            addCriterion("emp_tel >=", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelLessThan(String value) {
            addCriterion("emp_tel <", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelLessThanOrEqualTo(String value) {
            addCriterion("emp_tel <=", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelLike(String value) {
            addCriterion("emp_tel like", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelNotLike(String value) {
            addCriterion("emp_tel not like", value, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelIn(List<String> values) {
            addCriterion("emp_tel in", values, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelNotIn(List<String> values) {
            addCriterion("emp_tel not in", values, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelBetween(String value1, String value2) {
            addCriterion("emp_tel between", value1, value2, "empTel");
            return (Criteria) this;
        }

        public Criteria andEmpTelNotBetween(String value1, String value2) {
            addCriterion("emp_tel not between", value1, value2, "empTel");
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
     * This class corresponds to the database table Employee
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
     * This class corresponds to the database table Employee
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