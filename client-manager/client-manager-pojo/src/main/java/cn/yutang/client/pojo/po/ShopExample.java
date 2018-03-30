package cn.yutang.client.pojo.po;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class ShopExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Shop
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Shop
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Shop
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public ShopExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
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
     * This method corresponds to the database table Shop
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
     * This method corresponds to the database table Shop
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Shop
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
     * This class corresponds to the database table Shop
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

        public Criteria andShopNameIsNull() {
            addCriterion("shop_name is null");
            return (Criteria) this;
        }

        public Criteria andShopNameIsNotNull() {
            addCriterion("shop_name is not null");
            return (Criteria) this;
        }

        public Criteria andShopNameEqualTo(String value) {
            addCriterion("shop_name =", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameNotEqualTo(String value) {
            addCriterion("shop_name <>", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameGreaterThan(String value) {
            addCriterion("shop_name >", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameGreaterThanOrEqualTo(String value) {
            addCriterion("shop_name >=", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameLessThan(String value) {
            addCriterion("shop_name <", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameLessThanOrEqualTo(String value) {
            addCriterion("shop_name <=", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameLike(String value) {
            addCriterion("shop_name like", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameNotLike(String value) {
            addCriterion("shop_name not like", value, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameIn(List<String> values) {
            addCriterion("shop_name in", values, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameNotIn(List<String> values) {
            addCriterion("shop_name not in", values, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameBetween(String value1, String value2) {
            addCriterion("shop_name between", value1, value2, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNameNotBetween(String value1, String value2) {
            addCriterion("shop_name not between", value1, value2, "shopName");
            return (Criteria) this;
        }

        public Criteria andShopNicknameIsNull() {
            addCriterion("shop_nickname is null");
            return (Criteria) this;
        }

        public Criteria andShopNicknameIsNotNull() {
            addCriterion("shop_nickname is not null");
            return (Criteria) this;
        }

        public Criteria andShopNicknameEqualTo(String value) {
            addCriterion("shop_nickname =", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameNotEqualTo(String value) {
            addCriterion("shop_nickname <>", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameGreaterThan(String value) {
            addCriterion("shop_nickname >", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameGreaterThanOrEqualTo(String value) {
            addCriterion("shop_nickname >=", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameLessThan(String value) {
            addCriterion("shop_nickname <", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameLessThanOrEqualTo(String value) {
            addCriterion("shop_nickname <=", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameLike(String value) {
            addCriterion("shop_nickname like", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameNotLike(String value) {
            addCriterion("shop_nickname not like", value, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameIn(List<String> values) {
            addCriterion("shop_nickname in", values, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameNotIn(List<String> values) {
            addCriterion("shop_nickname not in", values, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameBetween(String value1, String value2) {
            addCriterion("shop_nickname between", value1, value2, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopNicknameNotBetween(String value1, String value2) {
            addCriterion("shop_nickname not between", value1, value2, "shopNickname");
            return (Criteria) this;
        }

        public Criteria andShopPasswordIsNull() {
            addCriterion("shop_password is null");
            return (Criteria) this;
        }

        public Criteria andShopPasswordIsNotNull() {
            addCriterion("shop_password is not null");
            return (Criteria) this;
        }

        public Criteria andShopPasswordEqualTo(String value) {
            addCriterion("shop_password =", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordNotEqualTo(String value) {
            addCriterion("shop_password <>", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordGreaterThan(String value) {
            addCriterion("shop_password >", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("shop_password >=", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordLessThan(String value) {
            addCriterion("shop_password <", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordLessThanOrEqualTo(String value) {
            addCriterion("shop_password <=", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordLike(String value) {
            addCriterion("shop_password like", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordNotLike(String value) {
            addCriterion("shop_password not like", value, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordIn(List<String> values) {
            addCriterion("shop_password in", values, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordNotIn(List<String> values) {
            addCriterion("shop_password not in", values, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordBetween(String value1, String value2) {
            addCriterion("shop_password between", value1, value2, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopPasswordNotBetween(String value1, String value2) {
            addCriterion("shop_password not between", value1, value2, "shopPassword");
            return (Criteria) this;
        }

        public Criteria andShopStatusIsNull() {
            addCriterion("shop_status is null");
            return (Criteria) this;
        }

        public Criteria andShopStatusIsNotNull() {
            addCriterion("shop_status is not null");
            return (Criteria) this;
        }

        public Criteria andShopStatusEqualTo(Integer value) {
            addCriterion("shop_status =", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusNotEqualTo(Integer value) {
            addCriterion("shop_status <>", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusGreaterThan(Integer value) {
            addCriterion("shop_status >", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("shop_status >=", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusLessThan(Integer value) {
            addCriterion("shop_status <", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusLessThanOrEqualTo(Integer value) {
            addCriterion("shop_status <=", value, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusIn(List<Integer> values) {
            addCriterion("shop_status in", values, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusNotIn(List<Integer> values) {
            addCriterion("shop_status not in", values, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusBetween(Integer value1, Integer value2) {
            addCriterion("shop_status between", value1, value2, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("shop_status not between", value1, value2, "shopStatus");
            return (Criteria) this;
        }

        public Criteria andShopTelIsNull() {
            addCriterion("shop_tel is null");
            return (Criteria) this;
        }

        public Criteria andShopTelIsNotNull() {
            addCriterion("shop_tel is not null");
            return (Criteria) this;
        }

        public Criteria andShopTelEqualTo(String value) {
            addCriterion("shop_tel =", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelNotEqualTo(String value) {
            addCriterion("shop_tel <>", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelGreaterThan(String value) {
            addCriterion("shop_tel >", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelGreaterThanOrEqualTo(String value) {
            addCriterion("shop_tel >=", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelLessThan(String value) {
            addCriterion("shop_tel <", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelLessThanOrEqualTo(String value) {
            addCriterion("shop_tel <=", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelLike(String value) {
            addCriterion("shop_tel like", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelNotLike(String value) {
            addCriterion("shop_tel not like", value, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelIn(List<String> values) {
            addCriterion("shop_tel in", values, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelNotIn(List<String> values) {
            addCriterion("shop_tel not in", values, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelBetween(String value1, String value2) {
            addCriterion("shop_tel between", value1, value2, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopTelNotBetween(String value1, String value2) {
            addCriterion("shop_tel not between", value1, value2, "shopTel");
            return (Criteria) this;
        }

        public Criteria andShopLogoIsNull() {
            addCriterion("shop_logo is null");
            return (Criteria) this;
        }

        public Criteria andShopLogoIsNotNull() {
            addCriterion("shop_logo is not null");
            return (Criteria) this;
        }

        public Criteria andShopLogoEqualTo(String value) {
            addCriterion("shop_logo =", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoNotEqualTo(String value) {
            addCriterion("shop_logo <>", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoGreaterThan(String value) {
            addCriterion("shop_logo >", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoGreaterThanOrEqualTo(String value) {
            addCriterion("shop_logo >=", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoLessThan(String value) {
            addCriterion("shop_logo <", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoLessThanOrEqualTo(String value) {
            addCriterion("shop_logo <=", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoLike(String value) {
            addCriterion("shop_logo like", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoNotLike(String value) {
            addCriterion("shop_logo not like", value, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoIn(List<String> values) {
            addCriterion("shop_logo in", values, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoNotIn(List<String> values) {
            addCriterion("shop_logo not in", values, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoBetween(String value1, String value2) {
            addCriterion("shop_logo between", value1, value2, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopLogoNotBetween(String value1, String value2) {
            addCriterion("shop_logo not between", value1, value2, "shopLogo");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeIsNull() {
            addCriterion("shop_openTime is null");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeIsNotNull() {
            addCriterion("shop_openTime is not null");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeEqualTo(String value) {
            addCriterion("shop_openTime =", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeNotEqualTo(String value) {
            addCriterion("shop_openTime <>", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeGreaterThan(String value) {
            addCriterion("shop_openTime >", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeGreaterThanOrEqualTo(String value) {
            addCriterion("shop_openTime >=", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeLessThan(String value) {
            addCriterion("shop_openTime <", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeLessThanOrEqualTo(String value) {
            addCriterion("shop_openTime <=", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeLike(String value) {
            addCriterion("shop_openTime like", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeNotLike(String value) {
            addCriterion("shop_openTime not like", value, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeIn(List<String> values) {
            addCriterion("shop_openTime in", values, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeNotIn(List<String> values) {
            addCriterion("shop_openTime not in", values, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeBetween(String value1, String value2) {
            addCriterion("shop_openTime between", value1, value2, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopOpentimeNotBetween(String value1, String value2) {
            addCriterion("shop_openTime not between", value1, value2, "shopOpentime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeIsNull() {
            addCriterion("shop_closeTime is null");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeIsNotNull() {
            addCriterion("shop_closeTime is not null");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeEqualTo(String value) {
            addCriterion("shop_closeTime =", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeNotEqualTo(String value) {
            addCriterion("shop_closeTime <>", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeGreaterThan(String value) {
            addCriterion("shop_closeTime >", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeGreaterThanOrEqualTo(String value) {
            addCriterion("shop_closeTime >=", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeLessThan(String value) {
            addCriterion("shop_closeTime <", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeLessThanOrEqualTo(String value) {
            addCriterion("shop_closeTime <=", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeLike(String value) {
            addCriterion("shop_closeTime like", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeNotLike(String value) {
            addCriterion("shop_closeTime not like", value, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeIn(List<String> values) {
            addCriterion("shop_closeTime in", values, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeNotIn(List<String> values) {
            addCriterion("shop_closeTime not in", values, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeBetween(String value1, String value2) {
            addCriterion("shop_closeTime between", value1, value2, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andShopClosetimeNotBetween(String value1, String value2) {
            addCriterion("shop_closeTime not between", value1, value2, "shopClosetime");
            return (Criteria) this;
        }

        public Criteria andContractTermIsNull() {
            addCriterion("contract_term is null");
            return (Criteria) this;
        }

        public Criteria andContractTermIsNotNull() {
            addCriterion("contract_term is not null");
            return (Criteria) this;
        }

        public Criteria andContractTermEqualTo(Integer value) {
            addCriterion("contract_term =", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermNotEqualTo(Integer value) {
            addCriterion("contract_term <>", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermGreaterThan(Integer value) {
            addCriterion("contract_term >", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermGreaterThanOrEqualTo(Integer value) {
            addCriterion("contract_term >=", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermLessThan(Integer value) {
            addCriterion("contract_term <", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermLessThanOrEqualTo(Integer value) {
            addCriterion("contract_term <=", value, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermIn(List<Integer> values) {
            addCriterion("contract_term in", values, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermNotIn(List<Integer> values) {
            addCriterion("contract_term not in", values, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermBetween(Integer value1, Integer value2) {
            addCriterion("contract_term between", value1, value2, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractTermNotBetween(Integer value1, Integer value2) {
            addCriterion("contract_term not between", value1, value2, "contractTerm");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeIsNull() {
            addCriterion("contract_startTime is null");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeIsNotNull() {
            addCriterion("contract_startTime is not null");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeEqualTo(Date value) {
            addCriterionForJDBCDate("contract_startTime =", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeNotEqualTo(Date value) {
            addCriterionForJDBCDate("contract_startTime <>", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeGreaterThan(Date value) {
            addCriterionForJDBCDate("contract_startTime >", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("contract_startTime >=", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeLessThan(Date value) {
            addCriterionForJDBCDate("contract_startTime <", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("contract_startTime <=", value, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeIn(List<Date> values) {
            addCriterionForJDBCDate("contract_startTime in", values, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeNotIn(List<Date> values) {
            addCriterionForJDBCDate("contract_startTime not in", values, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("contract_startTime between", value1, value2, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractStarttimeNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("contract_startTime not between", value1, value2, "contractStarttime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeIsNull() {
            addCriterion("contract_endTime is null");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeIsNotNull() {
            addCriterion("contract_endTime is not null");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeEqualTo(Date value) {
            addCriterionForJDBCDate("contract_endTime =", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeNotEqualTo(Date value) {
            addCriterionForJDBCDate("contract_endTime <>", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeGreaterThan(Date value) {
            addCriterionForJDBCDate("contract_endTime >", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("contract_endTime >=", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeLessThan(Date value) {
            addCriterionForJDBCDate("contract_endTime <", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("contract_endTime <=", value, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeIn(List<Date> values) {
            addCriterionForJDBCDate("contract_endTime in", values, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeNotIn(List<Date> values) {
            addCriterionForJDBCDate("contract_endTime not in", values, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("contract_endTime between", value1, value2, "contractEndtime");
            return (Criteria) this;
        }

        public Criteria andContractEndtimeNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("contract_endTime not between", value1, value2, "contractEndtime");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table Shop
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
     * This class corresponds to the database table Shop
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