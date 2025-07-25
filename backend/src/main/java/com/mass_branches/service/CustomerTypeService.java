package com.mass_branches.service;

import com.mass_branches.exception.NotFoundException;
import com.mass_branches.model.CustomerType;
import com.mass_branches.model.CustomerTypeName;
import com.mass_branches.repository.CustomerTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomerTypeService {
    private final CustomerTypeRepository repository;

    public CustomerType findByNameOrThrowsNotFoundException(String name) {
        try {
            return repository.findByName(CustomerTypeName.valueOf(name))
                    .orElseThrow(RuntimeException::new);
        } catch (Exception e) {
            throw new NotFoundException("Customer type not found");
        }
    }
}
