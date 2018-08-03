package com.swisscom.gateway;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
		// by default uses a Bean by the name of corsConfigurationSource
		.anonymous()

		//CORS. Lo configuramos en un bean, pero podriamos hacerlo aqui
		.and()
		.cors()

		//CSRF
		//Cuando el CSRF no se supera el error que se recive es un 403. No confundir con un error de autenticación
		.and()
		.csrf().disable();
		//.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		//OPTIONS has to be included because when the browser makes POST, DELETE or PUT requests, first does an OPTIONS
		//configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PUT","OPTIONS"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.addAllowedHeader("content-type");
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
