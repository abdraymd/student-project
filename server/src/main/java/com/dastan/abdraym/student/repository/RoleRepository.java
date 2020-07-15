package com.dastan.abdraym.student.repository;

import com.dastan.abdraym.student.model.Role;
import com.dastan.abdraym.student.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleName roleName);
}
