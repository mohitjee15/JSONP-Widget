<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {
	public function beforeFilter(){
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		// return only the headers and not the content
		// only allow CORS if we're doing a GET - i.e. no saving for now.
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
			header('Access-Control-Allow-Methods: GET,POST,PUT,HEAD,DELETE,OPTIONS');
			exit;
		}
		//$this->header('Access-Control-Allow-Origin',true);
		$this->response->header(array('Access-Control-Allow-Origin' => "*",
			'Access-Control-Allow-Headers' => "Origin, X-Requested-With, Content-Type, Accept",
			'Access-Control-Allow-Methods' => "GET,POST,PUT,HEAD,DELETE,OPTIONS"
			));
		


	}
}

