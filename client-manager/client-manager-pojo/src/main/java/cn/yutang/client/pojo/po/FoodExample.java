package cn.yutang.client.pojo.po;

import java.util.ArrayList;
import java.util.List;

public class FoodExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Food
     *
     * @mbg.generated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Food
     *
     * @mbg.generated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table Food
     *
     * @mbg.generated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public FoodExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
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
     * This method corresponds to the database table Food
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
     * This method corresponds to the database table Food
     *
     * @mbg.generated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Food
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
     * This class corresponds to the database table Food
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

        public Criteria andFdIdIsNull() {
            addCriterion("fd_id is null");
            return (Criteria) this;
        }

        public Criteria andFdIdIsNotNull() {
            addCriterion("fd_id is not null");
            return (Criteria) this;
        }

        public Criteria andFdIdEqualTo(Integer value) {
            addCriterion("fd_id =", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotEqualTo(Integer value) {
            addCriterion("fd_id <>", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThan(Integer value) {
            addCriterion("fd_id >", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("fd_id >=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThan(Integer value) {
            addCriterion("fd_id <", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThanOrEqualTo(Integer value) {
            addCriterion("fd_id <=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdIn(List<Integer> values) {
            addCriterion("fd_id in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotIn(List<Integer> values) {
            addCriterion("fd_id not in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdBetween(Integer value1, Integer value2) {
            addCriterion("fd_id between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotBetween(Integer value1, Integer value2) {
            addCriterion("fd_id not between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdNameIsNull() {
            addCriterion("fd_name is null");
            return (Criteria) this;
        }

        public Criteria andFdNameIsNotNull() {
            addCriterion("fd_name is not null");
            return (Criteria) this;
        }

        public Criteria andFdNameEqualTo(String value) {
            addCriterion("fd_name =", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameNotEqualTo(String value) {
            addCriterion("fd_name <>", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameGreaterThan(String value) {
            addCriterion("fd_name >", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameGreaterThanOrEqualTo(String value) {
            addCriterion("fd_name >=", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameLessThan(String value) {
            addCriterion("fd_name <", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameLessThanOrEqualTo(String value) {
            addCriterion("fd_name <=", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameLike(String value) {
            addCriterion("fd_name like", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameNotLike(String value) {
            addCriterion("fd_name not like", value, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameIn(List<String> values) {
            addCriterion("fd_name in", values, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameNotIn(List<String> values) {
            addCriterion("fd_name not in", values, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameBetween(String value1, String value2) {
            addCriterion("fd_name between", value1, value2, "fdName");
            return (Criteria) this;
        }

        public Criteria andFdNameNotBetween(String value1, String value2) {
            addCriterion("fd_name not between", value1, value2, "fdName");
            return (Criteria) this;
        }

        public Criteria andFtIdIsNull() {
            addCriterion("ft_id is null");
            return (Criteria) this;
        }

        public Criteria andFtIdIsNotNull() {
            addCriterion("ft_id is not null");
            return (Criteria) this;
        }

        public Criteria andFtIdEqualTo(Integer value) {
            addCriterion("ft_id =", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdNotEqualTo(Integer value) {
            addCriterion("ft_id <>", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdGreaterThan(Integer value) {
            addCriterion("ft_id >", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("ft_id >=", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdLessThan(Integer value) {
            addCriterion("ft_id <", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdLessThanOrEqualTo(Integer value) {
            addCriterion("ft_id <=", value, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdIn(List<Integer> values) {
            addCriterion("ft_id in", values, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdNotIn(List<Integer> values) {
            addCriterion("ft_id not in", values, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdBetween(Integer value1, Integer value2) {
            addCriterion("ft_id between", value1, value2, "ftId");
            return (Criteria) this;
        }

        public Criteria andFtIdNotBetween(Integer value1, Integer value2) {
            addCriterion("ft_id not between", value1, value2, "ftId");
            return (Criteria) this;
        }

        public Criteria andFdPriceIsNull() {
            addCriterion("fd_price is null");
            return (Criteria) this;
        }

        public Criteria andFdPriceIsNotNull() {
            addCriterion("fd_price is not null");
            return (Criteria) this;
        }

        public Criteria andFdPriceEqualTo(Double value) {
            addCriterion("fd_price =", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceNotEqualTo(Double value) {
            addCriterion("fd_price <>", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceGreaterThan(Double value) {
            addCriterion("fd_price >", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceGreaterThanOrEqualTo(Double value) {
            addCriterion("fd_price >=", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceLessThan(Double value) {
            addCriterion("fd_price <", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceLessThanOrEqualTo(Double value) {
            addCriterion("fd_price <=", value, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceIn(List<Double> values) {
            addCriterion("fd_price in", values, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceNotIn(List<Double> values) {
            addCriterion("fd_price not in", values, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceBetween(Double value1, Double value2) {
            addCriterion("fd_price between", value1, value2, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdPriceNotBetween(Double value1, Double value2) {
            addCriterion("fd_price not between", value1, value2, "fdPrice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceIsNull() {
            addCriterion("fd_mprice is null");
            return (Criteria) this;
        }

        public Criteria andFdMpriceIsNotNull() {
            addCriterion("fd_mprice is not null");
            return (Criteria) this;
        }

        public Criteria andFdMpriceEqualTo(Double value) {
            addCriterion("fd_mprice =", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceNotEqualTo(Double value) {
            addCriterion("fd_mprice <>", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceGreaterThan(Double value) {
            addCriterion("fd_mprice >", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceGreaterThanOrEqualTo(Double value) {
            addCriterion("fd_mprice >=", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceLessThan(Double value) {
            addCriterion("fd_mprice <", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceLessThanOrEqualTo(Double value) {
            addCriterion("fd_mprice <=", value, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceIn(List<Double> values) {
            addCriterion("fd_mprice in", values, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceNotIn(List<Double> values) {
            addCriterion("fd_mprice not in", values, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceBetween(Double value1, Double value2) {
            addCriterion("fd_mprice between", value1, value2, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdMpriceNotBetween(Double value1, Double value2) {
            addCriterion("fd_mprice not between", value1, value2, "fdMprice");
            return (Criteria) this;
        }

        public Criteria andFdStockIsNull() {
            addCriterion("fd_stock is null");
            return (Criteria) this;
        }

        public Criteria andFdStockIsNotNull() {
            addCriterion("fd_stock is not null");
            return (Criteria) this;
        }

        public Criteria andFdStockEqualTo(Integer value) {
            addCriterion("fd_stock =", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockNotEqualTo(Integer value) {
            addCriterion("fd_stock <>", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockGreaterThan(Integer value) {
            addCriterion("fd_stock >", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockGreaterThanOrEqualTo(Integer value) {
            addCriterion("fd_stock >=", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockLessThan(Integer value) {
            addCriterion("fd_stock <", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockLessThanOrEqualTo(Integer value) {
            addCriterion("fd_stock <=", value, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockIn(List<Integer> values) {
            addCriterion("fd_stock in", values, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockNotIn(List<Integer> values) {
            addCriterion("fd_stock not in", values, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockBetween(Integer value1, Integer value2) {
            addCriterion("fd_stock between", value1, value2, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStockNotBetween(Integer value1, Integer value2) {
            addCriterion("fd_stock not between", value1, value2, "fdStock");
            return (Criteria) this;
        }

        public Criteria andFdStatusIsNull() {
            addCriterion("fd_status is null");
            return (Criteria) this;
        }

        public Criteria andFdStatusIsNotNull() {
            addCriterion("fd_status is not null");
            return (Criteria) this;
        }

        public Criteria andFdStatusEqualTo(Integer value) {
            addCriterion("fd_status =", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusNotEqualTo(Integer value) {
            addCriterion("fd_status <>", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusGreaterThan(Integer value) {
            addCriterion("fd_status >", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("fd_status >=", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusLessThan(Integer value) {
            addCriterion("fd_status <", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusLessThanOrEqualTo(Integer value) {
            addCriterion("fd_status <=", value, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusIn(List<Integer> values) {
            addCriterion("fd_status in", values, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusNotIn(List<Integer> values) {
            addCriterion("fd_status not in", values, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusBetween(Integer value1, Integer value2) {
            addCriterion("fd_status between", value1, value2, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("fd_status not between", value1, value2, "fdStatus");
            return (Criteria) this;
        }

        public Criteria andFdUnitIsNull() {
            addCriterion("fd_unit is null");
            return (Criteria) this;
        }

        public Criteria andFdUnitIsNotNull() {
            addCriterion("fd_unit is not null");
            return (Criteria) this;
        }

        public Criteria andFdUnitEqualTo(String value) {
            addCriterion("fd_unit =", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitNotEqualTo(String value) {
            addCriterion("fd_unit <>", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitGreaterThan(String value) {
            addCriterion("fd_unit >", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitGreaterThanOrEqualTo(String value) {
            addCriterion("fd_unit >=", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitLessThan(String value) {
            addCriterion("fd_unit <", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitLessThanOrEqualTo(String value) {
            addCriterion("fd_unit <=", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitLike(String value) {
            addCriterion("fd_unit like", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitNotLike(String value) {
            addCriterion("fd_unit not like", value, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitIn(List<String> values) {
            addCriterion("fd_unit in", values, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitNotIn(List<String> values) {
            addCriterion("fd_unit not in", values, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitBetween(String value1, String value2) {
            addCriterion("fd_unit between", value1, value2, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdUnitNotBetween(String value1, String value2) {
            addCriterion("fd_unit not between", value1, value2, "fdUnit");
            return (Criteria) this;
        }

        public Criteria andFdRemarkIsNull() {
            addCriterion("fd_remark is null");
            return (Criteria) this;
        }

        public Criteria andFdRemarkIsNotNull() {
            addCriterion("fd_remark is not null");
            return (Criteria) this;
        }

        public Criteria andFdRemarkEqualTo(String value) {
            addCriterion("fd_remark =", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkNotEqualTo(String value) {
            addCriterion("fd_remark <>", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkGreaterThan(String value) {
            addCriterion("fd_remark >", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("fd_remark >=", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkLessThan(String value) {
            addCriterion("fd_remark <", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkLessThanOrEqualTo(String value) {
            addCriterion("fd_remark <=", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkLike(String value) {
            addCriterion("fd_remark like", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkNotLike(String value) {
            addCriterion("fd_remark not like", value, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkIn(List<String> values) {
            addCriterion("fd_remark in", values, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkNotIn(List<String> values) {
            addCriterion("fd_remark not in", values, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkBetween(String value1, String value2) {
            addCriterion("fd_remark between", value1, value2, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdRemarkNotBetween(String value1, String value2) {
            addCriterion("fd_remark not between", value1, value2, "fdRemark");
            return (Criteria) this;
        }

        public Criteria andFdImgIsNull() {
            addCriterion("fd_img is null");
            return (Criteria) this;
        }

        public Criteria andFdImgIsNotNull() {
            addCriterion("fd_img is not null");
            return (Criteria) this;
        }

        public Criteria andFdImgEqualTo(String value) {
            addCriterion("fd_img =", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgNotEqualTo(String value) {
            addCriterion("fd_img <>", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgGreaterThan(String value) {
            addCriterion("fd_img >", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgGreaterThanOrEqualTo(String value) {
            addCriterion("fd_img >=", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgLessThan(String value) {
            addCriterion("fd_img <", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgLessThanOrEqualTo(String value) {
            addCriterion("fd_img <=", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgLike(String value) {
            addCriterion("fd_img like", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgNotLike(String value) {
            addCriterion("fd_img not like", value, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgIn(List<String> values) {
            addCriterion("fd_img in", values, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgNotIn(List<String> values) {
            addCriterion("fd_img not in", values, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgBetween(String value1, String value2) {
            addCriterion("fd_img between", value1, value2, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdImgNotBetween(String value1, String value2) {
            addCriterion("fd_img not between", value1, value2, "fdImg");
            return (Criteria) this;
        }

        public Criteria andFdRecommendIsNull() {
            addCriterion("fd_recommend is null");
            return (Criteria) this;
        }

        public Criteria andFdRecommendIsNotNull() {
            addCriterion("fd_recommend is not null");
            return (Criteria) this;
        }

        public Criteria andFdRecommendEqualTo(Integer value) {
            addCriterion("fd_recommend =", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendNotEqualTo(Integer value) {
            addCriterion("fd_recommend <>", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendGreaterThan(Integer value) {
            addCriterion("fd_recommend >", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendGreaterThanOrEqualTo(Integer value) {
            addCriterion("fd_recommend >=", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendLessThan(Integer value) {
            addCriterion("fd_recommend <", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendLessThanOrEqualTo(Integer value) {
            addCriterion("fd_recommend <=", value, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendIn(List<Integer> values) {
            addCriterion("fd_recommend in", values, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendNotIn(List<Integer> values) {
            addCriterion("fd_recommend not in", values, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendBetween(Integer value1, Integer value2) {
            addCriterion("fd_recommend between", value1, value2, "fdRecommend");
            return (Criteria) this;
        }

        public Criteria andFdRecommendNotBetween(Integer value1, Integer value2) {
            addCriterion("fd_recommend not between", value1, value2, "fdRecommend");
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
     * This class corresponds to the database table Food
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
     * This class corresponds to the database table Food
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