package com.mass_branches.repository;

import com.mass_branches.model.Budget;
import com.mass_branches.model.BudgetItem;
import com.mass_branches.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BudgetItemRepository extends JpaRepository<BudgetItem, Long> {
    @Query("SELECT COALESCE(SUM(b.totalValue), 0) FROM budget_item  b WHERE b.budget.id = :budgetId")
    BigDecimal sumTotalValueByBudget_Id(String budgetId);

    @Query("SELECT COALESCE(SUM(b.totalWithBdi), 0) FROM budget_item  b WHERE b.budget.id = :budgetId")
    BigDecimal sumTotalWithBdiByBudget_Id(String budgetId);

    List<BudgetItem> findAllByBudget(Budget budget);

    List<BudgetItem> findAllByStage(Stage stage);
}
