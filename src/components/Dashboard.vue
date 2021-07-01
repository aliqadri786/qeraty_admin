<template>
	<div>
		<div class="row">
			<h3 class="Main-heading">
				Dashboard
				<span style="font-size:large">Summary of App</span>
			</h3>
		</div>
		
	</div>
</template>

<script>
	import Vue from "vue";
	import VueFusionCharts from "vue-fusioncharts";
	import FusionCharts from "fusioncharts";
	import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
	import line from "fusioncharts/fusioncharts.charts";
	Vue.use(VueFusionCharts, FusionCharts, FusionTheme, line);


	export default {
		
		data() {
			return {
				loadingGraph: false,
				selected: "this_month",
				salesByProduct: {},
				dataSource: {
					chart: {
						caption: "Sale Trend",
						yaxisname: "Sales",

						numberprefix: "Rs  ",
						rotatelabels: "0",
						setadaptiveymin: "1",
						theme: "fusion"
					},
					data: []
				},
				dataFormat: "json",

				dashboardCards: {},
				dashboardData: {},
				todaySale: "",
				todayExpense: "",
				todayOrders: "",
				todayCustomers: "",
				todayDiscount: "",

				yesterdaySale: "",
				yesterdayExpense: "",
				yesterdayOrders: "",
				yesterdayCustomers: "",
				yesterdayDiscount: "",

				this_monthSale: "",
				this_monthExpense: "",
				this_monthOrders: "",
				this_monthCustomers: "",
				this_monthDiscount: "",

				width: "100%",
				height: "350"
			};
		},
		mounted() {
			this.$store
				.dispatch("getAllDashboards")
				.then(data => {
					this.dashboardData = data;

					this.todaySale = data.today.sale;
					this.todayExpense = data.today.expense;
					this.todayOrders = data.today.order;
					this.todayDiscount = data.today.discount;
					this.todayCustomers = data.today.customer;

					this.yesterdaySale = data.yesterday.sale;
					this.yesterdayExpense = data.yesterday.expense;
					this.yesterdayOrders = data.yesterday.order;
					this.yesterdayDiscount = data.yesterday.discount;
					this.yesterdayCustomers = data.yesterday.customer;

					this.this_monthSale = data.this_month.sale;
					this.this_monthExpense = data.this_month.expense;
					this.this_monthOrders = data.this_month.order;
					this.this_monthDiscount = data.this_month.discount;
					this.this_monthCustomers = data.this_month.customer;
				})
				.catch(error => {
					alert(error);
				});

			this.$store
				.dispatch("getDashboardTopCards")
				.then(data => {
					this.dashboardCards = data;
				})
				.catch(error => {
					alert(error);
				});
			this.getLineGraphData();
		},
		methods: {
			setFilteredData(data) {
				if (data) {
					this.salesByProduct = data;
				}
				console.log("mydata--> ", data); // eslint-disable-line no-console
			},
			getLineGraphData() {
				this.loadingGraph = true;
				this.$store
					.dispatch("getDashboardLineGraph", this.selected)
					.then(data => {
						this.dataSource.data = data;
						(this.loadingGraph = false), console.log("graph data-->? ", data); // eslint-disable-line no-console
					})
					.catch(error => {
						alert(error);
					});
			},
			gotoCustomers() {
				this.$router.push("/customer");
			},
			gotoProducts() {
				this.$router.push("/product");
			},
			gotoSuppliers() {
				this.$router.push("/supplier");
			},
			gotoUsers() {
				this.$router.push("/user");
			}
		}
	};
</script>

<style scoped>
	.Main-heading {
		text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
			0px 18px 15px rgba(0, 0, 0, 0.1);
		color: darkcyan;
	}
	.card {
		padding: 0px;

		border: none;
		border-radius: 0px;
		color: white;

		text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
			0px 18px 23px rgba(0, 0, 0, 0.1);
	}
	.card::-webkit-scrollbar {
		width: 0px;
	}
	.today {
		background-color: #2980b9;
	}
	.yesterday {
		background-color: #48c9b0;
	}
	.month {
		background-color: #21618c;
	}
	.graph {
		-webkit-box-shadow: 0 19px 38px rgba(196, 196, 196, 0.9),
			0 15px 12px rgba(214, 214, 214, 0.22);
		-moz-box-shadow: 0 19px 38px rgba(209, 209, 209, 0.9),
			0 15px 12px rgba(197, 197, 197, 0.22);
		-ms-box-shadow: 0 19px 38px rgba(214, 214, 214, 0.9),
			0 15px 12px rgba(214, 214, 214, 0.22);
		-o-box-shadow: 0 19px 38px rgba(204, 204, 204, 0.3),
			0 15px 12px rgba(202, 202, 202, 0.22);
		box-shadow: 0 19px 38px rgba(192, 192, 192, 0.3),
			0 15px 12px rgba(218, 218, 218, 0.22);
		margin-bottom: 40px;
		padding: 10px;
	}
	.cards {
		padding: 10px;
	}
	.hideLabel {
		background-color: white;
		width: 90px;
		height: 20px;
		position: relative;

		margin-top: -20px;
	}
	.my-table {
		width: 100%;
	}
	#spinner {
		position: absolute;
		left: 50%;
		top: 40%;
	}
</style>>
