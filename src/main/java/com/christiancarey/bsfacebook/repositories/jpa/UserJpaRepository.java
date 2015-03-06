package com.christiancarey.bsfacebook.repositories.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.christiancarey.bsfacebook.domain.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
	List<User> findByUsername(String username);
}
