package com.saikiran.MyDairy.Repository;

import com.saikiran.MyDairy.Entity.DairyEntries;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DairyEntiresRepository extends JpaRepository<DairyEntries,Integer> {
    List<DairyEntries> findByUserId(Integer userId);
}
