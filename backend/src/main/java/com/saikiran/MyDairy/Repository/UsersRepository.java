package com.saikiran.MyDairy.Repository;

import com.saikiran.MyDairy.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users,Integer> {

    Optional<Users> findByUsername(String username);
}
