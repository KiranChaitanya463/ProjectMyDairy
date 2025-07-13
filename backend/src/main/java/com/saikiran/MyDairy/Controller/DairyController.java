package com.saikiran.MyDairy.Controller;

import com.saikiran.MyDairy.Entity.DairyEntries;
import com.saikiran.MyDairy.Service.DairyEntriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dairy")
public class DairyController {

    @Autowired
    private DairyEntriesService dairyEntriesService;

    @GetMapping("/getentries/{username}")
    public List<DairyEntries> getAllEntries(@PathVariable("username") String username){
        return dairyEntriesService.getAllEntries(username);
    }

    @PostMapping("/addentry")
    public String addNewEntry(@RequestBody DairyEntries entry){
        return dairyEntriesService.addEntry(entry);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEntry(@RequestBody DairyEntries updatedEntry) {
        try {
            DairyEntries updated = dairyEntriesService.updateEntry(updatedEntry);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEntry(@PathVariable Integer id){
        return dairyEntriesService.deleteEntry(id);
    }
}
