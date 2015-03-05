package demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.christiancarey.bsfacebook.BSGApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = BSGApplication.class)
@WebAppConfiguration
public class BSOpenidApplicationTests {

	@Test
	public void contextLoads() {
	}

}
