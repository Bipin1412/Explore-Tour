package com.explorertours.backend.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> {

  boolean existsByEmailIgnoreCase(String email);

  boolean existsByPhoneNumber(String phoneNumber);

  Optional<UserAccount> findByEmailIgnoreCase(String email);
}
