var goalsApp = angular.module('goalsApp',[]);
goalsApp.directive('menutooltip', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hover(function(){
				console.log($(element).find('span'))
				var showLabels = $('#leftMenu').hasClass('collapsed');
				if(showLabels===true){
					$(element).tooltip('show');					
				}
			}, function(){
				$(element).tooltip('hide');
			});
		}
	};
});
goalsApp.controller('GoalsListController',function($scope,$timeout){
	$scope.goals = [
	{'id':'1','goaltitle':'First Project','fundneeded':'629129.00','yearstogoal':'2'},
	{'id':'2','goaltitle':'Our Product','fundneeded':'529129.00','yearstogoal':'4'},
	];
	/*Menu Items start*/
	$scope.menuItems = [
	{'icon':'fa-home','title':'Home'},
	{'icon':'fa-users','title':'Family'},
	{'icon':'fa-shopping-cart','title':'Spending'},
	{'icon':'fa-bullseye','title':'Goals'},
	{'icon':'fa-medkit','title':'Risk'},
	{'icon':'fa-line-chart','title':'Tax'},
	{'icon':'fa-check-square','title':'Checklist'},
	{'icon':'fa-sellsy','title':'Advice'},
	];
	/*Menu Items end*/
	var _timeout;
	$scope.showLabels = false;
	$scope.showGoalsContent = function(goal){
		$('#goalsContent').removeClass('collapsed');
	};
	$scope.hideGoalsContent = function(){
		$('#goalsContent').addClass('collapsed');
	};
	$scope.updateGoalsContent = function(goal){
		$scope.goalContentTitle = $scope.goals[goal-1].goaltitle;
		$scope.fundneeded = $scope.goals[goal-1].fundneeded;
		$scope.yearstogoal = $scope.goals[goal-1].yearstogoal;
	};
	$scope.toggleLeftMenu = function(){

		if($('#leftMenu').hasClass('collapsed')){
			$('#leftMenu').removeClass('collapsed');
			/*if there is already a timeout in process cancel it*/
			if(_timeout) {  
				$timeout.cancel(_timeout);
			}
			$('#leftMenu').find('.leftMenuItems ul li').attr('title','');
			_timeout = $timeout(function() {
				$scope.showLabels = true;
				_timeout = null;
			}, 200);
			
		}else{
			$('#leftMenu').addClass('collapsed');
			$('#leftMenu').find('.leftMenuItems ul li').attr('title','{{menuItem.title}}');
			$scope.showLabels = false;
		}
	}

});