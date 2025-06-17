package com.saikiran.MyDairy.Service;

import com.saikiran.MyDairy.Entity.DairyEntries;
import com.saikiran.MyDairy.Entity.Users;
import com.saikiran.MyDairy.Repository.DairyEntiresRepository;
import com.saikiran.MyDairy.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DairyEntriesService {

    @Autowired
    private DairyEntiresRepository dairyEntiresRepository;

    @Autowired
    private UsersRepository usersRepository;

    public List<DairyEntries> getAllEntries(String username){
        Optional<Users> existingUser = usersRepository.findByUsername(username);
        if(existingUser.isPresent()){
            Integer userId=existingUser.get().getId();
            return dairyEntiresRepository.findByUserId(userId);
        }
        else{
            return new ArrayList<>();
        }
    }

    public String addEntry(DairyEntries entry){
        entry.setDate(LocalDate.now());
        dairyEntiresRepository.save(entry);
        return "Entry added successfully";
    }

    public DairyEntries updateEntry(DairyEntries updatedentry){
        updatedentry.setDate(LocalDate.now());
        dairyEntiresRepository.save(updatedentry);
        return updatedentry;
    }

    public String deleteEntry(Integer entryId) {
        if (dairyEntiresRepository.existsById(entryId)) {
            dairyEntiresRepository.deleteById(entryId);
            return "Deleted successfully";
        } else {
            return "Entry not found";
        }
    }


}
