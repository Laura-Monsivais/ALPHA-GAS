<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    $response = $next($request);
    if($request->method() === 'GET'){
      $headers = [
        'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers' => 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, X-Requested-With, content-type, Content-Type, Access-Control-Request-Method, Authorization, Access-Control-Request-Headers, enctype, withcredentials'
      ];    
      $IlluminateResponse = 'Illuminate\Http\Response';
      if($response instanceof $IlluminateResponse) {
        foreach ($headers as $key => $value) {
          $response->header($key, $value);
        }
        return $response;
      }    
      $SymfonyResopnse = 'Symfony\Component\HttpFoundation\Response';
      if($response instanceof $SymfonyResopnse) {
        foreach ($headers as $key => $value) {
          $response->headers->set($key, $value);
        }
        return $response;
      }
    } else {
      $headers = [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers' => 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, X-Requested-With, content-type, Content-Type, Access-Control-Request-Method, Authorization, Access-Control-Request-Headers, enctype, withcredentials',
        'Access-Control-Max-Age' => '1000'
      ];    
      foreach ($headers as $key => $value) {
        $response->header($key, $value);
      }
    }
    return $response;
  }
}
