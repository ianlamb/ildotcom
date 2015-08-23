/* global describe, it, beforeEach, inject */
describe('app.utilities', function() {
	beforeEach(module('app.utilities'));

	describe('slugify()', function() {
		it('should turn a string into a slug', inject(function(Utilities){
			Utilities.slugify('Foo Bar').should.equal('foo-bar');
		}));
	});

	describe('stripHtmlTags()', function() {
		it('should remove html tags from a string', inject(function(Utilities){
			Utilities.stripHtmlTags('<div>chicken</div>').should.equal('chicken');
		}));
	});

	describe('capitaliseFirstLetter()', function() {
		it('should capitalise the first letter of a string', inject(function(Utilities){
			Utilities.capitaliseFirstLetter('foo bar').should.equal('Foo bar');
		}));
	});

	describe('formatSlug()', function() {
		it('should turn a slug into a title', inject(function(Utilities){
			Utilities.formatSlug('foo-bar').should.equal('Foo Bar');
		}));
	});

	describe('daysInMonth()', function() {
		it('should return 31 days for January', inject(function(Utilities){
			Utilities.daysInMonth(1, 2001).should.equal(31);
		}));
		it('should return 28 days for February', inject(function(Utilities){
			Utilities.daysInMonth(2, 2001).should.equal(28);
		}));
		it('should return 29 days for February on a leap year', inject(function(Utilities){
			Utilities.daysInMonth(2, 2000).should.equal(29);
		}));
	});
});